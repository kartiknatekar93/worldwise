import styles from "./CountryItem.module.css";
function CountryItem({ country }) {

  const { country: countryName,emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h4>{countryName}</h4>
    </li>
  );
}

export default CountryItem;
