import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <span>WorldWise</span>
      </div>
    </Link>
  );
};

export default Logo;
