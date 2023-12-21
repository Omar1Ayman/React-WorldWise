import "./applayout.css";
import { NavLink, Outlet } from "react-router-dom";
import Map from "./Map";
import Logo from "../Logo";
import User from "./User";

const AppLayout = () => {
  return (
    <>
      <div className="appBars">
        <div className="leftBar">
          <h2 style={{ margin: "20px 0 30px 0" }}>
            <Logo />
          </h2>
          <div className="btns">
            <NavLink className="btn" to="cities">
              CITIES
            </NavLink>
            <NavLink className="btn" to="countries">
              COUNTRIES
            </NavLink>
          </div>

          <Outlet />
        </div>

        <div className="rightBar">
          <Map />
          <User />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
