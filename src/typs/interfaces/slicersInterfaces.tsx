import ICons from "../../typs/interfaces/ICard";

export interface IChef {
  id: number;
  first_name: string;
  last_name: string;
  about: string;
  img_url: string;
  restaurant_ids: Array<number>;
}

export interface IRestaurant {
  id: number;
  is_favorite: boolean;
  name: string;
  img_url: string;
  hours: Array<number>;
  address: string;
  rating: number;
  dish_ids: Array<number>;
  opening_year: number;
}

export interface IDish {
  id: number;
  name: string;
  img_url: string;
  changes: Array<string>;
  ingredients: Array<string>;
  price: number;
  icons: ICons;
  sides: Array<string>;
  is_signature: boolean;
  dishTiming: IDishTiming;
}

export interface IOrder {
  id: number | undefined;
  name: string | undefined;
  img_url: string | undefined;
  changes: Array<string> | undefined;
  price: number | undefined;
  sides: string | undefined;
  quantity: number | undefined;
}

export interface IDishTiming {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}
