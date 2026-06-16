import { createContext, useEffect, useState, useContext } from "react";
const BASE_URL = "http://localhost:9000/";

const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentCity, setcurrentCity] = useState({});
  useEffect(() => {
    setIsLoading(true);
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getcity({ id }) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities/${id}`);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setcurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addcity(newcity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        body: JSON.stringify(newcity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deletecity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isloading,
        getcity,
        currentCity,
        addcity,
        isloading,
        deletecity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("provider is outside of the contxt");
  return context;
}

export { CityProvider, useCities };
