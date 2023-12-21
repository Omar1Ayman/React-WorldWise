import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { Button } from "@mui/material";
import { useCities } from "../../context/citiesCoontext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCity, currentCity } = useCities();
  useEffect(function () {
    getCity(id);
  }, []);
  const { emoji, cityName, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button variant="contained" onClick={() => navigate("/app")}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
