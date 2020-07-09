const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  shop: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports.Product = mongoose.model("Product", productSchema);
