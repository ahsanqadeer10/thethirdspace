const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const checkToken = require("../middleware/checkToken");

const { Product } = require("../models/product");
const { Shop } = require("../models/shop");
const { Vendor } = require("../models/vendor");

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

router.get("/", async (req, res) => {
  try {
    var products;
    if (req.query.filter) {
      products = await Product.find({
        _id: { $in: req.query.productIds },
      });
    } else {
      products = await Product.find();
    }
    res.send(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/view", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(401).send({
        errors: { invalid: "The server could not retrieve the product." },
      });
    } else {
      res.send({ product });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id/delete", checkToken, async (req, res, next) => {
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
    const product = await Product.findById(req.params.id);
    if (!vendor || !product) {
      res.status(400).send({
        errors: {
          invalid: "Unauthorized",
        },
      });
    } else if (!vendor.shop.equals(product.shop.id)) {
      res.status(400).send({
        errors: {
          invalid: "Unauthorized",
        },
      });
    } else {
      Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
          res
            .status(401)
            .send({ errors: { invalid: "Error deleting content." } });
        } else {
          res.send();
        }
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id/update", checkToken, async (req, res, next) => {
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
    const product = await Product.findById(req.params.id);
    if (!vendor || !product) {
      res.status(400).send({
        errors: {
          invalid: "Unauthorized",
        },
      });
    } else if (!vendor.shop.equals(product.shop.id)) {
      res.status(400).send({
        errors: {
          invalid: "Unauthorized",
        },
      });
    } else {
      Product.findById(req.params.id, function (err, product) {
        if (!err) {
          product.stock = req.body.newQty;
          product.save(function (err, product) {
            if (err) {
              console.log(err);
              return;
            }
          });
        }
      });
      res.send();
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
