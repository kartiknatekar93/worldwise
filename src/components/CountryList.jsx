import CountryItem from "./CountryItem.jsx";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx"
import Message from "./Message.jsx"
function CountryList({ cities ,isloading}) {

  if(isloading) return <Spinner/>
if(!cities.length) return <Message message="click on the map"/>

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
