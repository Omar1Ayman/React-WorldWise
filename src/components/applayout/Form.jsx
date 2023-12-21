import { Button } from "@mui/material";
import BackButton from "./BackButton";
import { useUrlPostion } from "../../hooks/useUrlPosition";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../context/citiesCoontext";
import FormComponent from "../from/FormComponent";
import { useAuth } from "../../context/FakeAuthContext";
// import { FormComponent } from "../../components/from/FormComponent";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const Form = () => {
  const [lat, lng] = useUrlPostion();
  const [isLoadingGeoCoding, setisLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [geocodingError, setGeocodingError] = useState("");
  const [emoji, setEmoji] = useState("");
  const { createCity, isLoading } = useCities();
  const { user } = useAuth();
  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCity() {
      try {
        setisLoadingGeoCoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setNotes(notes);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setisLoadingGeoCoding(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  const HandelSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      userID: user.id,
      position: {
        lat,
        lng,
      },
    };
    setCityName("");
    setCountry("");
    setEmoji("");
    setNotes("");
    createCity(newCity);
  };
  if (!lat || !lng)
    return (
      <h4 style={{ textAlign: "center", margin: "50px 0" }}>
        Start By Clicking on the map 🖐
      </h4>
    );
  return (
    <>
      <FormComponent
        className="form"
        onSubmit={HandelSubmit}
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <div className="form-col">
          <label>City name</label>
          <input type="text" value={cityName} />
          {/* <h1>hello {emoji}</h1> */}
        </div>
        <div className="form-col">
          <label>When dd you go to?</label>
          <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            className="date-picker"
            onChange={(date) => setDate(date)}
          />
        </div>
        <div className="form-col">
          <label>Notes about your trip to</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="form-col form-btns">
          <Button variant="outlined" type="submit">
            Add
          </Button>
          <BackButton />
        </div>
      </FormComponent>
    </>
  );
};

export default Form;
