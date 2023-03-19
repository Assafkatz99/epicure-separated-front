import React, { useEffect } from "react";
import Chef_img_card from "../Chef_img_card/Chef_img_card";
import Small_rest_card from "../small_rest_card/Small_rest_card";

import "./Chef_of_the_week.css";
import { useNavigate } from "react-router-dom";
import Restaurants from "../../../restaurants/Restaurants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  IChef,
  IRestaurant,
} from "../../../../typs/interfaces/slicersInterfaces";

const Chef_of_the_week: React.FC = () => {
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const chefs = useSelector((state: RootState) => state.chefs.value);
  const chef_of_the_week_id = useSelector(
    (state: RootState) => state.chefs.chef_of_the_week_id
  );

  const chef_of_the_week = chefs.find(
    (chef: IChef) => chef.id === Number(chef_of_the_week_id)
  );

  const navigation = useNavigate();

  return (
    <div className="chef_of_the_week_div">
      <h1>CHEF OF THE WEEK:</h1>
      <div className="upper_chef_of_the_week_div">
        <Chef_img_card
          layout="homepage"
          chef_f_name={
            chef_of_the_week?.first_name ? chef_of_the_week.first_name : ""
          }
          chef_l_name={
            chef_of_the_week?.last_name ? chef_of_the_week.last_name : ""
          }
          chef_img_src={
            chef_of_the_week?.img_url ? chef_of_the_week.img_url : ""
          }
        />
        <p>{chef_of_the_week?.about}</p>
      </div>
      <div className="botton_chef_of_the_week_div">
        <span>{chef_of_the_week?.first_name}'s Restaurant</span>
        <div className="chef_of_the_week_cards">
          {chef_of_the_week?.restaurant_ids
            .map((rest_id: number) =>
              restaurants.find((rest: IRestaurant) => rest.id === rest_id)
            )
            .slice(0, 4)
            .map((restaurant: IRestaurant | undefined, index: number) => (
              <Small_rest_card
                key={index}
                onclick={() => {
                  navigation(`/restaurants/${restaurant?.id}`);
                }}
                rest_img={restaurant?.img_url ? restaurant?.img_url : ""}
                rest_name={restaurant?.name ? restaurant?.name : ""}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Chef_of_the_week;
