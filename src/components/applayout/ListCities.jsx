import React, { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom";
import { useCities } from "../../context/citiesCoontext.jsx";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
const ListCities = () => {
  const { cities, isLoading, currentCity, deleteCity } = useCities();

  return (
    <>
      {cities.length >= 1 ? (
        <ul className="links">
          {cities.map((city) => {
            return (
              <Link
                key={city.id}
                to={`${city.id}?lat=${city["position"].lat}&lng=${city["position"].lng}`}
              >
                <li
                  key={city.id}
                  className={`link ${
                    city.id === currentCity.id ? "link-active" : ""
                  }`}
                >
                  <div className="flags">
                    <span>{city.emoji}</span>
                    <span>{city.cityName}</span>
                  </div>

                  <div className="controls">
                    <span className="date">({formatDate(city.date)})</span>

                    <span
                      className="close"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCity(city.id);
                      }}
                    >
                      x
                    </span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "25px", margin: "50px 0" }}>
          no data to return..
        </h1>
      )}
    </>
  );
};

export default ListCities;
