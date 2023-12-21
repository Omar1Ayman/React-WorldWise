import { Button } from "@mui/material";
import "./content.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../../context/FakeAuthContext";

const Content = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="text">
          <h1>
            You travel the world.
            <br />
            WorldWise keeps track of your adventures.
          </h1>
          <p>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </p>
          <Link to={`${user ? "app" : "login"}`}>
            <Button
              sx={{ px: "50px", py: "10px" }}
              variant="contained"
              color="success"
            >
              start tracking now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Content;
