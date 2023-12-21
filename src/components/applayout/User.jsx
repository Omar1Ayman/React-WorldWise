import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../../context/FakeAuthContext";
import { Avatar } from "@mui/material";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <Avatar src="/assets/7.jpg" alt={`${user.username}`} />
      <span>Welcome, {user.username}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
