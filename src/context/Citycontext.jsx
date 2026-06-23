import {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
  act,
} from "react";
const BASE_URL = "http://localhost:9000/";

const CityContext = createContext();

const initialstate = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isloading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isloading: false,
      };

    case "city/loaded":
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
      };

    case "rejected":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isloading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialstate,
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Error cannot load the cities",
        });
      }
    }

    fetchCities();
  }, []);

  async function getcity({ id }) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}cities/${id}`);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error cannot load the cities",
      });
    }
  }

  async function addcity(newcity) {
    try {
      dispatch({ type: "loading" });
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
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error cannot load the cities",
      });
    }
  }

  async function deletecity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error cannot load the cities",
      });
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
