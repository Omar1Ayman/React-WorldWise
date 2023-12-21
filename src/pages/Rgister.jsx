import React, { useEffect, useState } from "react";
import FormComponent from "../components/from/FormComponent";
import styled from "styled-components";
import { Button } from "@mui/material";

import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { isAuthenticated, user, register } = useAuth();
  const navigate = useNavigate();

  const HandelSubmitRegister = (e) => {
    e.preventDefault();
    console.log("regster");
    const newUser = {
      email,
      password,
      username,
    };
    if (email && password) register(newUser);
  };
  useEffect(
    function () {
      console.log(user, isAuthenticated);
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <>
      <Navbar />
      <Wrapper>
        <FormComponent
          className="form"
          onSubmit={HandelSubmitRegister}
          style={{ opacity: 1 }}
        >
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <div className="form-col">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-col">
            <label>Email Address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-col">
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-col">
            <Button type="submit" variant="outlined">
              Register
            </Button>
          </div>
        </FormComponent>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 30%;
  margin: 100px auto;
  //   background-color: red;
  height: 50%;
  display: felx;
  justify-content: center;
  align-items: center;
`;
export default Register;
