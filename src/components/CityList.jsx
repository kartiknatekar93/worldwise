import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx"
import Message from "./Message.jsx"
function CityList({ cities,isloading }) {
if(isloading) return <Spinner/>
if(!cities.length) return <Message message="click on the map"/>

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
