import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useContext } from "react";
import { useCities } from "../context/Citycontext.jsx";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deletecity } = useCities();

  function handledelete(e) {
    e.preventDefault();
    deletecity(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date}</time>
        <button className={styles.deleteBtn} onClick={handledelete}>
          {" "}
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
