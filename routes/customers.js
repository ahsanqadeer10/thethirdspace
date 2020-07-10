const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Customer } = require("../models/customer");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    var user = null;
    user =
      (await User.findOne({ phone: phone })) ||
      (await Customer.findOne({ email: email }));
    if (user) {
      return res.status(400).send("The phone or email is already registered.");
    } else {
      user = new User({
        name: name,
        phone: phone,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      var customer = new Customer({
        user: user._id,
        email: email,
      });

      customer.save();

      const token = jwt.sign({ _id: user._id }, config.get("PrivateKey"));
      res.header("x-auth-token", token).send({
        user: {
          id: user._id,
          type: "customer",
        },
      });
    }
  } catch (error) {
    return res.status(500).send("Internal server error.\n" + error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const customer = await User.findOne({ user: req.query.id });

    if (!customer) {
      console.log("User no longer registered.");
    } else {
      res.json(customer);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
