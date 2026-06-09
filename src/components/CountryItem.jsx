import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { country: countryName } = country;
  return (
    <li className={styles.countryItem}>
      <h4>{countryName}</h4>
    </li>
  );
}

export default CountryItem;
