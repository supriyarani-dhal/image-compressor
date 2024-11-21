/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Avatar } from "../components/ui/avatar";
import {
  IconButton,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { LuUser2 } from "react-icons/lu";
import Login from "../components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { toaster } from "../components/ui/toaster";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  //to log out
  const handleLogout = async () => {
    await signOut(auth);
    toaster.create({
      title: "Log out",
      description: "Logged out successfully",
      type: "success",
    });
    onClose();
  };

  return (
    <DrawerRoot size={"lg"} open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton aria-label="Profile" variant="ghost" mr={"10px"}>
          {user ? (
            <Avatar
              variant="solid"
              name={user.email}
              mr="10px"
              cursor="pointer"
            />
          ) : (
            <LuUser2 />
          )}
        </IconButton>
      </DrawerTrigger>
      <DrawerContent backgroundColor={"white"} color={"black"}>
        <DrawerHeader>
          <DrawerTitle display={"flex"} alignItems={"center"}>
            <Image
              src="https://images.softwaresuggest.com/software_logo/1666957708_image-to-text-converter-icon.png"
              w={"50px"}
              h={"50px"}
              mx={"10px"}
              fit="cover"
              alt="Pix Compress"
            />
            <Text textStyle={"2xl"} fontWeight={"bold"}>
              Pix Compress
            </Text>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DrawerActionTrigger asChild>
            {user?.emailVerified ? (
              <VStack>
                <Avatar src={user.photoURL || ""} w={"200px"} h={"200px"} />
                <Text fontSize={"xl"}>{user.email}</Text>
                <Button
                  mt={"10px"}
                  colorPalette="orange"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </VStack>
            ) : (
              <Login onclose={onClose} />
            )}
          </DrawerActionTrigger>
        </DrawerBody>
        <DrawerCloseTrigger variant={"solid"} />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Profile;
