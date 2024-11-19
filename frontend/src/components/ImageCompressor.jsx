/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(80);
  const [outputUrl, setOutputUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOutputUrl("");
  };

  const handleCompress = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);
    formData.append("quality", quality);

    try {
      const response = await axios.post(
        "http://YOUR_BACKEND_IP:3001/compress",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setOutputUrl(response.data.url);
    } catch (error) {
      console.error(error);
      alert("Image compression failed!");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WebP</option>
      </select>
      <input
        type="range"
        min="10"
        max="100"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      />
      <span>{quality}%</span>
      <button onClick={handleCompress}>Compress & Convert</button>

      {outputUrl && (
        <div>
          <h3>Processed Image:</h3>
          <a href={outputUrl} target="_blank" rel="noopener noreferrer">
            Download Processed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
