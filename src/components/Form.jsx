// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import BackButton from "./BackButton.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import { useCities } from "../context/Citycontext.jsx";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const Navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [error, setError] = useState(null);
  const [emoji, setEmoji] = useState(null);
  const { addcity, isloading } = useCities();

  async function handlesubmit(e) {
    e.preventDefault();

    const newcity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    await addcity(newcity);
    Navigate("/app/city");
  }

  useEffect(() => {
    async function fetchCity() {
      try {
        setError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        const data = await res.json();
        if (!data.countryCode) throw new Error("click valid city on map");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryName));
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCity();
  }, [lat, lng]);

  if (error) return <Message message={error}></Message>;

  return (
    <form
      className={`${styles.form} ${isloading ? "styles.loading" : ""}`}
      onSubmit={handlesubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
