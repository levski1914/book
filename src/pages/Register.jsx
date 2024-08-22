// src/pages/Register.js
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthForm from "./AuthForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email: user.email,
      });
      toast.success("Registration successful!");
      navigate("/profile");
    } catch (error) {
      setError(error.message);
      toast.error("Registration failed: " + error.message);
      console.error(error);
    }
  };

  const fields = [
    {
      name: "name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "Name",
      label: "Enter your name",
    },
    {
      name: "email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "Email",
      label: "Enter your email",
    },
    {
      name: "password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Password",
      label: "Type your password",
    },
  ];

  return (
    <AuthForm
      title="To register, enter your details"
      fields={fields}
      handleSubmit={handleRegister}
      buttonLabel="Register"
      formClass="register"
    />
  );
};

export default Register;
