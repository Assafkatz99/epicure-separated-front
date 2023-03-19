import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import "../popular-restaurant/Popular_restaurant.css";
import Modal from "../../../modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IDish } from "../../../../typs/interfaces/slicersInterfaces";
import { ICons } from "../../../../typs/interfaces/ICard";
import { useDispatch } from "react-redux";
import { fetchDishes } from "../../../../store/slicers/dishesSilcer";

const Popular_dishes: React.FC = () => {
  const dishes = useSelector((state: RootState) => state.dishes.value);
  const [showModal, setShowModal] = useState(false);
  const [DishIdForModal, setDishIdForModal] = useState(0);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="popular_restaurant">
        <span>SIGNATURE DISH OF:</span>
        <div className="popular_restaurant_cards">
          {dishes
            .filter((dish: IDish) => dish.is_signature)
            .slice(0, 3)
            .map((dish: IDish, index: number) => {
              return (
                <Card
                  key={index}
                  onclick={() => {
                    setDishIdForModal(dish.id);
                    setShowModal(true);
                  }}
                  class="dish"
                  img={dish.img_url}
                  name={dish.name}
                  icons={dish.icons as unknown as ICons}
                  dishDescription={dish.ingredients}
                  price={dish.price}
                />
              );
            })}
        </div>
      </div>
      {showModal && (
        <div className="modal-backdrop">
          <Modal
            dish={dishes.find((dish: IDish) => dish.id == DishIdForModal)}
            show={showModal}
            onclick={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default Popular_dishes;
