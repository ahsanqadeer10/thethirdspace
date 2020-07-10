const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    unique: true,
    required: true,
  },
});

module.exports.Vendor = mongoose.model("Vendor", vendorSchema);
