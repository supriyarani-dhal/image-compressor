/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, Input, VStack, Text, Fieldset } from "@chakra-ui/react";
import { Field } from "./ui/field";
import React, { useState } from "react";
import { signInWithGoogle, auth, db } from "../Firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { RiGoogleFill } from "react-icons/ri";
import { toaster } from "./ui/toaster";
import { addDoc, collection } from "firebase/firestore";

const Login = ({ onclose }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const toggleIsRegister = () => {
    setIsRegister(!isRegister);
  };

  //to log in with google
  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      toaster.create({
        title: "success",
        description: "Logged in successfully.",
        type: "success",
      });
      onclose();
    } else {
      toaster.create({
        title: "error occured in login",
        description: "error occured in login with google",
        type: "error",
      });
    }
  };

  //to log in with email and password
  const handleLoginWithEmailAndPassword = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (!result.user.emailVerified) {
        toaster.create({
          title: "warning",
          description: "Please verify your email before logging in.",
          type: "warning",
        });
        return;
      } else {
        toaster.create({
          title: "success",
          description: "Logged in successfully.",
          type: "success",
        });
        onclose();
      }
    } catch (error) {
      console.error(error.message);
      toaster.create({
        title: "error occured in login",
        description: "Not registered. Please register first.",
        type: "error",
      });
    }
  };

  //to register with email and password
  const handleRegisterWithEmailAndPassword = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      await sendEmailVerification(response.user);
      toaster.create({
        title: "email sent",
        description: "Verification email sent. Please check your inbox.",
        type: "success",
      });
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
      toaster.create({
        title: "sucess",
        description: "registration successfull",
        type: "success",
      });
      onclose();
    } catch (error) {
      console.error(error.message);
      toaster.create({
        title: "error occured in registration",
        description: error.message,
        type: "error",
      });
    }
  };

  //to send password reset email
  const handlePasswordResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toaster.create({
        title: "email sent",
        description: "password reset link sent to your email.",
        type: "success",
      });
    } catch (error) {
      console.error(error.message);
      toaster.create({
        title: "error occured in password reset",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={"10"}
    >
      <Fieldset.Root size={"lg"} maxW={"md"}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Login to Pix Compress
        </Text>

        {isRegister ? (
          <Text fontSize={"md"}>
            Already have an account?
            <Text
              ml={"5px"}
              color="blue"
              fontWeight={"bold"}
              onClick={() => toggleIsRegister()}
              mb={"10px"}
              display={"inline"}
              cursor={"pointer"}
            >
              Log in
            </Text>
          </Text>
        ) : (
          <Text fontSize={"md"}>
            Don&apos;t have an account?
            <Text
              ml={"5px"}
              color="blue"
              fontWeight={"bold"}
              onClick={() => toggleIsRegister()}
              mb={"10px"}
              display={"inline"}
              cursor={"pointer"}
            >
              Create account
            </Text>
          </Text>
        )}

        <VStack spacing={4}>
          <Button
            onClick={handleGoogleSignIn}
            colorPalette={"red"}
            color={"white"}
            w={"100%"}
          >
            <RiGoogleFill /> Continue with Google
          </Button>
          <Fieldset.Content>
            <Field label="Email">
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="me@example.com"
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456"
              />
            </Field>
          </Fieldset.Content>
          {isRegister ? (
            <Button
              colorPalette={"blue"}
              w={"100%"}
              mt={"10px"}
              color={"white"}
              onClick={() => handleRegisterWithEmailAndPassword()}
            >
              Continue with Email
            </Button>
          ) : (
            <Button
              colorPalette={"blue"}
              color={"white"}
              w={"100%"}
              mt={"10px"}
              onClick={() => handleLoginWithEmailAndPassword()}
            >
              Log in
            </Button>
          )}

          {!isRegister && (
            <Text
              color={"blue"}
              cursor={"pointer"}
              fontSize={"md"}
              onClick={() => handlePasswordResetEmail}
            >
              Forgot Password?
            </Text>
          )}
        </VStack>
      </Fieldset.Root>
    </Box>
  );
};

export default Login;
