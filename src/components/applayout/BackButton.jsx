import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </>
  );
};

export default BackButton;
