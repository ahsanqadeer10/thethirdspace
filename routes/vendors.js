const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const fs = require("fs");

const { Vendor } = require("../models/vendor");
const { Shop } = require("../models/shop");
const { User } = require("../models/user");

const checkToken = require("../middleware/checkToken");

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

// create
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      phone,
      password,
      shopName,
      shopDescription,
      shopAddress,
    } = req.body;

    var user = await User.findOne({ phone: phone });
    var vendor = null;
    var shop = null;
    if (user) {
      vendor = await Vendor.findOne({ user: user._id });
      if (vendor) {
        return res
          .status(400)
          .send("The phone number is already registered as a vendor.");
      }
    }
    var shop = await Shop.findOne({ name: shopName });
    if (shop) {
      return res
        .status(400)
        .send("The shop name is already taken. Please choose a new one.");
    }

    shop = new Shop({
      name: shopName,
      description: shopDescription,
      address: shopAddress,
      image: null,
      products: [],
    });

    if (!user) {
      user = new User({
        name: name,
        phone: phone,
        password: password,
      });
    }
    vendor = new Vendor({
      user: user._id,
      shop: shop._id,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await shop.save();
    await user.save();
    await vendor.save();

    const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));

    res.header("x-auth-token", token).send({
      user: {
        id: user._id,
        type: "vendor",
      },
    });
  } catch (error) {
    return res.status(500).send("Internal server error.\n" + error.message);
  }
});

router.get("/", checkToken, async (req, res, next) => {
  try {
    const allowedTypes = ["vendor", "admin"];
    if (!allowedTypes.includes(req.headers["x-auth-type"])) {
      return res
        .status(403)
        .send("You do not have access to this information.");
    }

    const vendor = await Vendor.findOne({
      user: req.headers["x-auth-id"],
    }).populate({
      path: "shop",
      populate: { path: "products" },
    });

    if (!vendor) {
      return res.status(404).send("The user could not be found.");
    } else {
      return res.send({ user: vendor });
    }
  } catch (error) {
    return res.status(500).send("Internal server error.\n" + error.message);
  }
});

module.exports = router;
