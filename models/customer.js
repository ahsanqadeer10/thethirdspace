const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  billingAddress: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  shippingAddress: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
});

module.exports.Customer = mongoose.model("Customer", customerSchema);
