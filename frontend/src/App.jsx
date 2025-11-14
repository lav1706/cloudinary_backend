import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imageUploadUrl, setImageUploadUrl] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/images");
        if (response.data) {
          setImages(response.data);
        } else {
          setImages("No Images yet");
        }
      } catch (error) {
        console.log(error);
        setMessage("Failed to load Images");
      }
    };
    fetchImages();
  }, []);

  const handleImageUpload = async (event) => {
    setImage(event.target.files[0]);
  };

  const imageUploader = async () => {
    if (!image) {
      setMessage("Please Upload Image to Upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUploadUrl(response.data?.imageUrl);
      setMessage("Upload Done");
    } catch (error) {
      console.error(error);
      setMessage("Image Upload Fails");
    }
  };

  return (
    <div id="main">
      <h2>Image Upload</h2>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={imageUploader}>Upload Image</button>
      <p>{message}</p>
      {imageUploadUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUploadUrl} alt="upload Image" />
        </div>
      )}
      <div>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img src={img.imageUrl} alt={`img${index}`} />
          ))
        ) : (
          <p>No Image Found</p>
        )}
      </div>
    </div>
  );
};

export default App;
