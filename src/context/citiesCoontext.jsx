import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { initialStat, reducer } from "./reducer";
import { useAuth } from "./FakeAuthContext";

const URL = "http://localhost:5000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialStat
  );
  const { user } = useAuth();

  useEffect(
    function () {
      const fetchCities = async () => {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(`${URL}/cities`);
          let data = await res.json();
          if (user) {
            data = data.filter((city) => city.userID === user.id);
          } else {
            return data;
          }
          dispatch({ type: "cities/loaded", payload: data });
        } catch (err) {
          dispatch({ type: "rejected", payload: err });
        }
      };
      fetchCities();
    },
    [user]
  );

  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function createCity(newCiity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCiity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Assuming a successful deletion, update the state to reflect the new list of cities
        dispatch({ type: "city/deleted", payload: id });
      } else {
        const errorData = await res.json();
        dispatch({ type: "rejected", payload: errorData });
        console.error("Error deleting city:", errorData);
        // Handle the error condition if needed
      }
    } catch (err) {
      console.error("Error deleting city:", err);
      dispatch({ type: "rejected", payload: "error" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the cities provider");
  return context;
}
export { CitiesProvider, useCities };
