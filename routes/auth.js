const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();

const { Customer } = require("../models/customer");
const { Vendor } = require("../models/vendor");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    var user = null;
    var userType = null;

    const { phone, email, password } = req.body;

    if (phone == undefined) {
      user = await Customer.findOne({ email: email });
      if (user) {
        userType = "customer";
      }
    } else {
      user = await User.findOne({ phone: phone });
      if (user) {
        var user_v = await Vendor.findById(user._id);
        if (user_v) {
          userType = "vendor";
        } else {
          userType = "customer";
        }
      }
    }

    if (!user) {
      const field = phone == undefined ? "email" : "phone";
      return res.status(400).send(`The ${field} or password is invalid.`);
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        const field = phone == undefined ? "email" : "phone";
        return res.status(400).send(`The ${field} or password is invalid.`);
      } else {
        const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));

        jwt.verify(token, config.get("PrivateKey"), (err, verifiedJwt) => {
          if (err) {
            console.log(err);
          } else {
            console.log(verifiedJwt);
          }
        });
        res.header("x-auth-token", token).send({
          user: {
            id: user._id,
            type: userType,
          },
        });
      }
    }
  } catch (error) {
    return res.status(500).send("Internal server error.\n" + error.message);
  }
});

module.exports = router;
