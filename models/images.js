import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    imagesUrl: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

const Images = mongoose.model("Images", imagesSchema);
export default Images;
