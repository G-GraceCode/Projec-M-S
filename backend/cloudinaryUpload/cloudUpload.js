import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleUpload = async (file) => {
  try {
    const imgRes = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return imgRes;
  } catch (e) {
    res.status(500);
    throw new Error({ message: e.message });
  }
};

export default handleUpload;
