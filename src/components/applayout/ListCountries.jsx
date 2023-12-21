import React, { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import { useCities } from "../../context/citiesCoontext.jsx";

const ListCountries = () => {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(countries);
  return (
    <>
      {countries.length >= 1 ? (
        <ul className="links-countries">
          {countries.map((country, idx) => {
            return (
              <li key={idx} className="link-country">
                <span>{country.emoji}</span>
                <span>{country.country}</span>
              </li>
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

export default ListCountries;
