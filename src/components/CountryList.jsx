import CountryItem from "./CountryItem.jsx";
import styles from "./CountryList.module.css";

function CountryList({ cities }) {
  console.log(cities);
  const country = cities.reduce((arr, item) => {
    if (!arr.map((el) => el.country).includes(item.country))
      return [...arr, { country: item.country, emoji: item.emoji }];
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {country.map((country) => (
        <CountryItem key={country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
