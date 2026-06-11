import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { CityProvider } from "./context/Citycontext.jsx";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="city" />} />
            <Route path="city" element={<CityList />} />
            <Route path="city/:id" element={<City />} />
            <Route path="form" element={<Form />} />
            <Route path="country" element={<CountryList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
