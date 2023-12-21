import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../Logo";
import { useAuth } from "../../context/FakeAuthContext";

const Navbar = () => {
  const { isAuthenticated, dispatch } = useAuth();
  return (
    <nav>
      <div className="wrapper">
        <Logo />
        <ul className="links">
          {isAuthenticated ? (
            <li className="link" onClick={() => dispatch({ type: "LOGOUT" })}>
              <NavLink to="/">Logout</NavLink>
            </li>
          ) : (
            <>
              <li className="link">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="link">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
