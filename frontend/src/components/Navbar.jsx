/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import Profile from "../pages/Profile";

const Navbar = () => {
  return (
    <Box
      background="blue.900"
      width="100%"
      h={"60px"}
      padding="2"
      color="white"
      fontSize="2xl"
      textAlign="center"
      zIndex="sticky"
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Link to="/">
        <Image
          src="https://images.softwaresuggest.com/software_logo/1666957708_image-to-text-converter-icon.png"
          w={"50px"}
          h={"50px"}
          ml={"10px"}
          fit="cover"
          alt="Pix Compress"
        />
        <Text fontWeight={"bold"}>Pix Compress</Text>
      </Link>
      <Profile />
    </Box>
  );
};

export default Navbar;
