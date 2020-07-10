const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const fs = require("fs");
const checkToken = require("../middleware/checkToken");
const { Shop } = require("../models/shop");
const { Vendor } = require("../models/vendor");
const { Product } = require("../models/product");

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// READ MY SHOP
router.get("/my-shop", checkToken, async (req, res) => {
  try {
    const { userId, userType } = req.query;
    const allowedUsers = ["vendor", "admin"];

    if (!allowedUsers.includes(userType)) {
      return res
        .status(401)
        .send({ errors: { invalid: "Authorization denied." } });
    }

    const vendor = await Vendor.findOne({ user: userId }).select("shop");
    const shop = await Shop.findById(vendor.shop).populate("products");

    if (!shop) {
      res.status(204).send({ shop: null });
    } else {
      res.send({ shop: shop });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    if (!shops) {
      res.status(204).send({ shops: [] });
    } else {
      res.send({ shops: shops });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
});

// READ ONE
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const shop = await Shop.findOne({ name: name }).populate("products");

    if (!shop) {
      res.status(204).send({ shop: null });
    } else {
      res.send({ shop: shop });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
});

// UPDATE SHOP
router.put(
  "/:id/",
  checkToken,
  upload.single("shopImage"),
  async (req, res, next) => {
    try {
      const allowedTypes = ["vendor", "admin"];
      if (!allowedTypes.includes(req.headers["x-auth-type"])) {
        return res
          .status(403)
          .send("You do not have access to this information.");
      }

      const vendor = await User.findOne({ user: req.headers["x-auth-id"] })
        .populate("shop")
        .select("shop");

      if (!vendor.shop._id.equals(req.params.id)) {
        return res.status(401).send("Authorization Denied.");
      } else {
        var shop = await Shop.findOne({ name: req.body.shopName });
        if (shop && !shop._id.equals(req.params.id)) {
          return res
            .status(400)
            .send("The shop name is already taken. Please enter a new one.");
        } else {
          shop = {
            name: req.body.shopName,
            description: req.body.shopDescription,
            address: req.body.shopAddress,
          };
          if (req.file) {
            var image = req.file;
            var filePath = ".\\" + image.path;
            image = fs.readFileSync(filePath);
            var finalImage = {
              contentType: req.file.mimetype,
              data: image,
            };
            shop.image = finalImage;
          }
          await Shop.findByIdAndUpdate(
            req.params.id,
            shop,
            { new: true },
            function (err, updatedShop) {
              if (err) {
                return res
                  .status(500)
                  .send("Internal server error \n" + err.message);
              } else {
                res.send({ updatedShop });
              }
            }
          );
        }
      }
    } catch (error) {
      res.status(500).send("Internal server error. \n" + error.message);
    }
  }
);

// REMOVE LOGO
router.delete("/:id/delete-logo", checkToken, async (req, res, next) => {
  try {
    const allowedTypes = ["vendor", "admin"];
    if (!allowedTypes.includes(req.headers["x-auth-type"])) {
      return res
        .status(403)
        .send("You do not have access to this information.");
    }

    const vendor = await Vendor.findOne({
      user: req.headers["x-auth-id"],
    }).select("shop");

    if (!vendor.shop.equals(req.params.id)) {
      return res.status(401).send("Authorization Denied.");
    } else {
      await Shop.findByIdAndUpdate(
        req.params.id,
        { image: null },
        { new: true },
        function (err, updatedShop) {
          if (err) {
            return res
              .status(500)
              .send("Internal server error \n" + err.message);
          } else {
            res.send({ updatedShop });
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).send("Internal server error. \n" + error.message);
  }
});

// create product
router.post(
  "/:id/products/",
  checkToken,
  upload.array("images", 5),
  async (req, res, next) => {
    try {
      const allowedTypes = ["vendor", "admin"];
      if (!allowedTypes.includes(req.headers["x-auth-type"])) {
        return res
          .status(403)
          .send("You do not have access to this information.");
      }

      const vendor = await Vendor.findOne({ user: req.headers["x-auth-id"] })
        .populate("shop")
        .select("shop");

      if (!vendor) {
        return res
          .status(401)
          .send(
            "Oops. Something went wrong. We could not find the user. Refresh the page or try logging in again :("
          );
      }

      if (!vendor.shop._id.equals(req.params.id)) {
        return res.status(401).send("Authorization Denied.");
      } else {
        var product = new Product({
          shop: {
            id: vendor.shop._id,
            name: vendor.shop.name,
          },
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          images: [],
        });

        if (req.files) {
          var images = [];
          for (i = 0; i < req.files.length; i++) {
            var image = req.files[i];
            var filePath = ".\\" + image.path;
            image = fs.readFileSync(filePath);
            var finalImage = {
              contentType: req.files[i].mimetype,
              data: image,
            };
            images.push(finalImage);
          }
          product.images = images;
        }

        product.save();
        vendor.shop.products.push(product);
        vendor.shop.save();
        res.send({ product });
      }
    } catch (error) {
      return res.status(500).send("Internal server error. \n" + error.message);
    }
  }
);

module.exports = router;
