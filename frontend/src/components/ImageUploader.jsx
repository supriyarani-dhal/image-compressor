/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Input, Text, Button, Select, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "./ui/file-upload";

const ImageUploader = () => {
  const [images, setImages] = useState([]); // Array of original images
  const [compressedImages, setCompressedImages] = useState([]); // Array of processed images
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("jpeg");

  const handleImageUpload = (val) => {
    const files = Array.from(val.files);

    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      size: file.size,
    }));
    setImages(imageFiles);
    setCompressedImages([]);
  };

  const handleSizeChange = (fileName, newSize) => {
    setSelectedSize((prev) => ({
      ...prev,
      [fileName]: newSize,
    }));
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const processImages = async () => {
    const processedImages = await Promise.all(
      images.map(async (img) => {
        const options = {
          maxSizeMB: selectedSize[img.file.name]
            ? selectedSize[img.file.name] / 1024 / 1024
            : 1,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(img.file, options);
        const blob = await imageCompression.getDataUrlFromFile(compressedFile);
        return {
          ...img,
          compressedFile,
          preview: blob,
        };
      })
    );
    setCompressedImages(processedImages);
  };

  const downloadImages = () => {
    compressedImages.forEach((img) => {
      const extension = selectedFormat || "jpeg";
      saveAs(img.compressedFile, `${img.file.name}.${extension}`);
    });
  };

  return (
    <Box p={4} h={"100vh"} bg={"white"}>
      {/* Image Upload */}
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target)}
        mb={4}
      />
      {/* <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
        <FileUploadDropzone
          label="Drag and drop here to upload"
          description=".png, .jpg up to 5MB"
          onChange={handleImageUpload}
        />
      </FileUploadRoot> */}

      {/* Image Carousel */}
      {images.length > 0 && (
        <Box mb={4}>
          <Text fontWeight="bold" mb={2}>
            Uploaded Images
          </Text>
          <Swiper spaceBetween={10} slidesPerView={3}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img.preview}
                  alt={`Image ${idx + 1}`}
                  style={{
                    maxWidth: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      {/* Image Options */}
      {images.length > 0 && (
        <Box>
          {images.map((img, idx) => (
            <Box
              key={idx}
              border="1px solid #ccc"
              borderRadius="md"
              p={3}
              mb={4}
            >
              <Text fontWeight="bold">{img.file.name}</Text>
              <Text>Original Size: {(img.size / 1024).toFixed(2)} KB</Text>
              <Flex mt={2}>
                <Box flex="1" mr={2}>
                  <Text fontSize="sm" mb={1}>
                    Select Size (KB)
                  </Text>
                  <Input
                    type="number"
                    value={selectedSize[img.file.name] || ""}
                    onChange={(e) =>
                      handleSizeChange(img.file.name, e.target.value)
                    }
                    placeholder="Enter size"
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" mb={1}>
                    Select Format
                  </Text>
                  <Select
                    onChange={() => handleFormatChange()}
                    value={selectedFormat}
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                  </Select>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      )}

      {/* Process and Download */}
      {images.length > 0 && (
        <Flex justifyContent="space-between" mt={4}>
          <Button colorScheme="blue" onClick={processImages}>
            Process Images
          </Button>
          <Button colorScheme="green" onClick={downloadImages}>
            Download All
          </Button>
        </Flex>
      )}

      {/* Compressed Image Preview */}
      {compressedImages.length > 0 && (
        <Box mt={6}>
          <Text fontWeight="bold" mb={2}>
            Compressed Images Preview
          </Text>
          <Swiper spaceBetween={10} slidesPerView={3}>
            {compressedImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img.preview}
                  alt={`Compressed ${idx + 1}`}
                  style={{
                    maxWidth: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
