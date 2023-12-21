import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();
const USER_URL = "http://localhost:5000/users";
const initialState = {
  users: [],
  user: null,
  isAuthenticated: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "users/loaded":
      return {
        ...state,
        users: action.payload,
        isAuthenticated: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
        isAuthenticated: true,
        user: action.payload,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
}

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated, users, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${USER_URL}`);
        const data = await res.json();
        dispatch({ type: "users/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      }
    };
    fetchUsers();
  }, []);
  function login(email, password) {
    if (email && password) {
      const checkUser = users.filter(
        (user) => user.email === email && user.password === password
      );
      if (checkUser.length > 0) {
        dispatch({ type: "LOGIN", payload: checkUser[0] });
      } else {
        dispatch({ type: "rejected", payload: "Invalid email or password" });
      }
    } else {
      dispatch({ type: "rejected", payload: "You should fill in all inputs" });
    }
  }

  async function register(newUser) {
    try {
      const res = await fetch(`${USER_URL}`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const userExists = users.some((user) => user.email === newUser.email);
      if (!userExists) {
        dispatch({ type: "REGISTER", payload: data });
      } else {
        alert("This email is already taken.");
      }
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        users,
        dispatch,
        register,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the cities provider");
  return context;
};

export { AuthProvider, useAuth };
