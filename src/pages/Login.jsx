import React, { useEffect, useState } from "react";
import FormComponent from "../components/from/FormComponent";
import styled from "styled-components";
import { Button } from "@mui/material";

import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("omar@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const HandelSubmitLognin = (e) => {
    e.preventDefault();
    console.log("first");
    if (email && password) login(email, password);
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
          onSubmit={HandelSubmitLognin}
          style={{ opacity: 1 }}
        >
          <h1 style={{ textAlign: "center" }}>Login</h1>
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
              login
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
export default Login;
