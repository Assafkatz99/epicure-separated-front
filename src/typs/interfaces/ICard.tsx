export interface ICons {
  isSpicy: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
}

export default interface ICard {
  img: string;
  name: string;
  rating?: number;
  chefName?: string;
  dishDescription?: string[];
  icons?: ICons;
  price?: number;
  class: string;
  onclick?: () => void;
}
