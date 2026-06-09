import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
function CityList({ cities }) {
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
