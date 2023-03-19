import React, { useEffect, useState } from "react";
import Footer from "../../homepage/hp-components/footer/Footer";
import Navbar from "../../navbar/Navbar";
import {
  Clean_button,
  DishTimeSortingButton,
} from "../../../typs/buttons/Styled_buttons";
import "./SingleRestaurant.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../homepage/hp-components/card/Card";
import { useParams } from "react-router-dom";
import Modal from "../../modal/Modal";
import { RootState } from "../../../store/store";
import {
  IChef,
  IDish,
  IRestaurant,
} from "../../../typs/interfaces/slicersInterfaces";
import { fetchDishes, filterDishes } from "../../../store/slicers/dishesSilcer";
import { fetchChefs } from "../../../store/slicers/chefsSlicer";

const SingleRestaurant: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [DishIdForModal, setDishIdForModal] = useState(0);

  const dishes = useSelector((state: RootState) => state.dishes.value);
  const chefs = useSelector((state: RootState) => state.chefs.value);
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );

  const rest_id = useParams()["single"] as unknown as number;

  const specific_rest = restaurants.find(
    (rest: IRestaurant) => rest.id == rest_id
  );

  const chef = chefs.find(
    (chef: IChef) =>
      chef.restaurant_ids && chef.restaurant_ids.includes(Number(rest_id))
  );

  const chef_name = `${chef?.first_name} ${chef?.last_name}`;

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [SelectedDishTimeSortingButton, SetSelectedDishTimeSortingButton] =
    useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      filterDishes({
        dish_timing: SelectedDishTimeSortingButton,
        dishes_id_list: specific_rest?.dish_ids,
      })
    );
  }, [SelectedDishTimeSortingButton]);
  return (
    <>
      {specific_rest && (
        <>
          <Navbar />
          <div className="rest_details">
            <img
              className="hero_img"
              src={specific_rest.img_url}
              alt="rest_img"
            />
            <div className="chef_n_rest_name">
              <h3>{specific_rest.name}</h3>
              <h2>{chef_name}</h2>
            </div>
            <h1>
              <img
                className="open_now_img"
                src="/assets/icons/rest_page_icons/open_now.svg"
              />

              {specific_rest.hours[0] < new Date().getHours() &&
              specific_rest.hours[1] > new Date().getHours()
                ? "Open now"
                : "Closed"}
            </h1>

            <div className="single_rest_filters">
              <DishTimeSortingButton
                className={
                  SelectedDishTimeSortingButton == "breakfast"
                    ? "border"
                    : "noBorder"
                }
                onClick={() => {
                  SetSelectedDishTimeSortingButton("breakfast");
                }}
              >
                Breakfast
              </DishTimeSortingButton>
              <DishTimeSortingButton
                className={
                  SelectedDishTimeSortingButton == "lunch"
                    ? "border"
                    : "noBorder"
                }
                onClick={() => {
                  SetSelectedDishTimeSortingButton("lunch");
                }}
              >
                Lunch
              </DishTimeSortingButton>
              <DishTimeSortingButton
                className={
                  SelectedDishTimeSortingButton == "dinner"
                    ? "border"
                    : "noBorder"
                }
                onClick={() => {
                  SetSelectedDishTimeSortingButton("dinner");
                }}
              >
                Dinner
              </DishTimeSortingButton>
            </div>
          </div>
          <div className="dishes_grid_div">
            <div className="dishes_grid">
              {dishes.map((dish: IDish, index: number) => {
                if (dish) {
                  return (
                    <Card
                      key={index}
                      onclick={() => {
                        setDishIdForModal(dish.id);
                        setShowModal(true);
                      }}
                      class="small_dish"
                      img={dish.img_url}
                      name={dish.name}
                      dishDescription={dish.ingredients}
                      price={dish.price}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <Footer />
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
      )}
    </>
  );
};

export default SingleRestaurant;
