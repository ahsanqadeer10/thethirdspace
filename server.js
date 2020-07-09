const express = require("express");
const connectDB = require("./config/db");
const config = require("config");
const multer = require("multer");
const crypto = require("crypto");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (!config.get("PrivateKey")) {
  console.error("FATAL ERROR: PrivateKey is not defined.");
  process.exit(1);
}

// Database Connection
connectDB();

app.use(express.json());

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/shops", require("./routes/shops"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/vendors", require("./routes/vendors"));
app.use("/api/auth", require("./routes/auth"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
