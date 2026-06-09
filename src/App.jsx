import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
const BASE_URL = "http://localhost:9000/";

function App() {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(true)
      async function fetchCities() {
        try {
          const response = await fetch(`${BASE_URL}cities`);
          if(!response.ok){
              throw new Error("something went wrong")
          }
          const data = await response.json();
          setCities(data);
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
      }
      
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="city" />} />
          <Route path="city" element={<CityList cities={cities} isloading={isloading}/>} />
          <Route path="city/:id" element={<City/>}/>
          <Route path="form" element={<Form/>}/>
          <Route path="country" element={<CountryList cities={cities} isloading={isloading}/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
