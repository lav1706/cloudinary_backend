const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const cloudinary = require("cloudinary");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeConnection } = require("./db.connect");
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

initializeConnection();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_keys: process.env.CLOUDINARY_API_KEY,
  api_secrets: process.env.CLOUDINARY_API_SECRET,
});

//multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

//api endpoints
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");
    // upload a cloud
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
    });
    //save it to mongodb
    const newImage = new Image({
      imageUrl: result.secure_url,
    });
    await newImage.save();
    res.status(200).json({
      message: "Image Uploaded Sucessfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Image Upload failure", error: error });
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(` Server running on port ${port}`));
