import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/homepage/Homepage";
import Restaurants from "./components/restaurants/Restaurants";
import Chefs from "./components/chefs/Chefs";
import SingleRestaurant from "./components/restaurants/restaurants_components/SingleRestaurant";
import { useEffect } from "react";
import SignInPage from "./components/signInPage/SignInPage";
import { useDispatch } from "react-redux";
import { fetchChefs } from "./store/slicers/chefsSlicer";
import { fetchDishes } from "./store/slicers/dishesSilcer";
import { fetchRestaurants } from "./store/slicers/restaurantsSlicer";
import SignUpPage from "./components/signUpPage/SignUpPage";
import ShoppingBag from "./components/navbar/navbar components/shopping bag component/ShoppingBag";
import AdminSystem from "./components/admin/AdminSystem";

function App() {
  useEffect(() => {
    window.addEventListener("load", function () {
      window.scrollTo(0, 0);
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChefs());
    dispatch(fetchDishes());
    dispatch(fetchRestaurants());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/restaurants" element={<Restaurants />}></Route>
          <Route
            path="/restaurants/:single"
            element={<SingleRestaurant />}
          ></Route>
          <Route path="/chefs" element={<Chefs />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/admin" element={<AdminSystem />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
