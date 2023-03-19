import React, { useEffect } from "react";
import Card from "../card/Card";
import "./Popular_restaurant.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  IChef,
  IRestaurant,
} from "../../../../typs/interfaces/slicersInterfaces";

const Popular_restaurant: React.FC = () => {
  const chefs = useSelector((state: RootState) => state.chefs.initialValue);
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const navigation = useNavigate();
  return (
    <div className="popular_restaurant">
      <span>POPULAR RESTAURANT IN EPICURE:</span>
      <div className="popular_restaurant_cards">
        {restaurants
          .filter((rest: IRestaurant) => rest.is_favorite)
          .slice(0, 3)
          .map((rest: IRestaurant, index: number) => {
            const chef = chefs.find((chef: IChef) =>
              chef.restaurant_ids.includes(rest.id)
            );
            const chef_name = `${chef?.first_name} ${chef?.last_name}`;
            return (
              <Card
                key={index}
                onclick={() => {
                  navigation(`/restaurants/${rest.id}`);
                }}
                chefName={chef_name}
                class="rest"
                img={rest.img_url}
                name={rest.name}
                rating={rest.rating}
              />
            );
          })}
      </div>
      <button
        onClick={() => {
          navigation(`/restaurants`);
        }}
      >
        All Restaurant {">>"}
      </button>
    </div>
  );
};

export default Popular_restaurant;
