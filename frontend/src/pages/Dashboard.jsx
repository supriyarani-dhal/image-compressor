// src/pages/Dashboard.jsx
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import ImageUploader from "../components/ImageUploader.jsx";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  if (user) {
    return (
      <>
        <Navigate to="/dashboard" />
        <ImageUploader />
      </>
    );
  }

  return (
    <Box backgroundColor={"white"} h={"100vh"}>
      <Text fontSize="lg" color="black">
        Please login first.
      </Text>
    </Box>
  );
};

export default Dashboard;
