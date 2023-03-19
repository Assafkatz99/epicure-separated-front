import { configureStore } from "@reduxjs/toolkit";
import {
  IChef,
  IRestaurant,
  IDish,
  IOrder,
} from "../typs/interfaces/slicersInterfaces";
import chefsSlicer from "./slicers/chefsSlicer";
import dishesSilcer from "./slicers/dishesSilcer";
import ordersSlicer from "./slicers/ordersSlicer";
import restaurantsSlicer from "./slicers/restaurantsSlicer";

export interface RootState {
  chefs: {
    initialValue: IChef[];
    value: IChef[];
    chef_of_the_week_id: string;
  };
  restaurants: {
    initialValue: IRestaurant[];
    value: IRestaurant[];
  };
  dishes: {
    initialValue: IDish[];
    value: IDish[];
    current_dishes: IDish[];
  };
  orders: {
    value: IOrder[];
  };
}

export default configureStore({
  reducer: {
    chefs: chefsSlicer,
    restaurants: restaurantsSlicer,
    dishes: dishesSilcer,
    orders: ordersSlicer,
  },
});
