import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import { useCities } from "../context/Citycontext.jsx";
function CityList() {
  const { cities, isloading } = useCities();
  if (isloading) return <Spinner />;
  if (!cities.length) return <Message message="click on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
