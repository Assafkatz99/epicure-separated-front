import axios from "axios";
import React, { useEffect, useState } from "react";
import { GenericButtons } from "../../../typs/buttons/Styled_buttons";
import {
  IChef,
  IDish,
  IRestaurant,
} from "../../../typs/interfaces/slicersInterfaces";
import "./AddPutComponent.css";

interface IAddPutComponent {
  type: "chef" | "rest" | "dish";
  action: "Add" | "Put";
  data?: IDish | IRestaurant | IChef | any;
}

const AddPutComponent: React.FC<IAddPutComponent> = (props) => {
  const data = props.data ? props.data : null;

  // chef info

  const defaultChefInformation = {
    id: props.action === "Put" && props.type === "chef" ? data.id : "",
    first_name:
      props.action === "Put" && props.type === "chef" ? data.first_name : "",
    last_name:
      props.action === "Put" && props.type === "chef" ? data.last_name : "",
    about: props.action === "Put" && props.type === "chef" ? data.about : "",
    img_url:
      props.action === "Put" && props.type === "chef" ? data.img_url : "",
    restaurant_ids:
      props.action === "Put" && props.type === "chef"
        ? data.restaurant_ids
        : "",
  };

  const [chefInformation, setChefInformation] = useState(
    defaultChefInformation
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChefInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // restaurant info

  const [restaurantInformation, setRestaurantInformation] = useState({
    id: props.action === "Put" && props.type === "rest" ? data.id : "",
    name: props.action === "Put" && props.type === "rest" ? data.name : "",
    img_url:
      props.action === "Put" && props.type === "rest" ? data.img_url : "",
    hours: props.action === "Put" && props.type === "rest" ? data.hours : "",
    is_favorite:
      props.action === "Put" && props.type === "rest"
        ? data.is_favorite
        : false,
    address:
      props.action === "Put" && props.type === "rest" ? data.address : "",
    opening_year:
      props.action === "Put" && props.type === "rest" ? data.opening_year : "",
    dish_ids:
      props.action === "Put" && props.type === "rest" ? data.dish_ids : "",
    rating: props.action === "Put" && props.type === "rest" ? data.rating : "",
  });

  // dish info

  const [dishInformation, setDishInformation] = useState({
    id: props.action === "Put" && props.type === "dish" ? data.id : "",
    name: props.action === "Put" && props.type === "dish" ? data.name : "",
    img_url:
      props.action === "Put" && props.type === "dish" ? data.img_url : "",
    changes:
      props.action === "Put" && props.type === "dish" ? data.changes : "",
    ingredients:
      props.action === "Put" && props.type === "dish" ? data.ingredients : "",
    price: props.action === "Put" && props.type === "dish" ? data.price : "",
    icons: {
      isSpicy:
        props.action === "Put" && props.type === "dish"
          ? data.icons.isSpicy
          : false,
      isVegan:
        props.action === "Put" && props.type === "dish"
          ? data.icons.isVegan
          : false,
      isVegetarian:
        props.action === "Put" && props.type === "dish"
          ? data.icons.isVegetarian
          : false,
    },
    sides: props.action === "Put" && props.type === "dish" ? data.sides : "",
    is_signature:
      props.action === "Put" && props.type === "dish"
        ? data.is_signature
        : false,
    dishTiming: {
      breakfast:
        props.action === "Put" && props.type === "dish"
          ? data.dishTiming.breakfast
          : false,
      lunch:
        props.action === "Put" && props.type === "dish"
          ? data.dishTiming.lunch
          : false,
      dinner:
        props.action === "Put" && props.type === "dish"
          ? data.dishTiming.dinner
          : false,
    },
  });

  return (
    <div className={`add_put_component_main_div ${props.type}`}>
      {props.type === "chef" && (
        <>
          <h3>{data ? "Edit a" : "Create new"} chef</h3>
          <form
            className="add_put_component_form"
            onSubmit={async (event) => {
              event.preventDefault();

              switch (props.action) {
                case "Add":
                  try {
                    const response = await axios.post(
                      "http://localhost:8000/api/chefs",
                      chefInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;

                case "Put":
                  try {
                    const response = await axios.put(
                      "http://localhost:8000/api/chefs",
                      chefInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;
              }

              window.location.reload();
            }}>
            <section>
              <div>First Name</div>
              <input
                name="first_name"
                placeholder="First Name"
                defaultValue={chefInformation.first_name}
                onChange={handleChange}
              />
            </section>
            <section>
              <div>Last Name</div>
              <input
                name="last_name"
                placeholder="Last Name"
                defaultValue={chefInformation.last_name}
                onChange={handleChange}
              />
            </section>
            <section>
              <div>About</div>
              <input
                name="about"
                placeholder="About"
                defaultValue={chefInformation.about}
                onChange={handleChange}
              />
            </section>
            <section>
              <div>Image URL</div>
              <input
                name="img_url"
                placeholder="Image URL"
                defaultValue={chefInformation.img_url}
                onChange={handleChange}
              />
            </section>
            <section>
              <div>Restaurants Ids</div>
              <input
                name="restaurant_ids"
                placeholder="Separated by ',' "
                defaultValue={chefInformation.restaurant_ids}
                onChange={handleChange}
              />
            </section>

            <GenericButtons type="submit" backgroundColor="grey">
              SUBMIT
            </GenericButtons>
          </form>
        </>
      )}
      {props.type === "rest" && (
        <>
          <h3>{data ? "Edit a" : "Create new"} restaurant</h3>
          <form
            className="add_put_component_form"
            onSubmit={async (event) => {
              event.preventDefault();
              switch (props.action) {
                case "Add":
                  try {
                    const response = await axios.post(
                      "http://localhost:8000/api/restaurants",
                      restaurantInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;

                case "Put":
                  try {
                    const response = await axios.put(
                      "http://localhost:8000/api/restaurants",
                      restaurantInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;
              }

              window.location.reload();
            }}>
            <section>
              <div>Name</div>
              <input
                placeholder="Name"
                defaultValue={restaurantInformation.name}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    name: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Image URL</div>
              <input
                placeholder="Image URL"
                defaultValue={restaurantInformation.img_url}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    img_url: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Hours</div>
              <input
                placeholder="Opening"
                style={{ width: "20%" }}
                defaultValue={restaurantInformation.hours[0]}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    hours: [event.target.value, restaurantInformation.hours[1]],
                  })
                }
              />
              <p style={{ width: "10%" }}>-</p>
              <input
                placeholder="Closing"
                style={{ width: "20%" }}
                defaultValue={restaurantInformation.hours[1]}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    hours: [restaurantInformation.hours[0], event.target.value],
                  })
                }
              />
            </section>

            <section>
              <div>Is Favorite</div>
              <select
                defaultValue={String(restaurantInformation.is_favorite)}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    is_favorite: event.target.value === "true",
                  })
                }>
                <option value="true">True ✔️</option>
                <option value="false">False ❌</option>
              </select>
            </section>
            <section>
              <div>Address</div>
              <input
                placeholder="Address"
                defaultValue={restaurantInformation.address}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    address: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Opening year</div>
              <input
                placeholder="Opening year"
                defaultValue={restaurantInformation.opening_year}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    opening_year: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Dish ids</div>
              <input
                placeholder="Separated by ',' "
                defaultValue={restaurantInformation.dish_ids}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    dish_ids: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Rating</div>
              <input
                placeholder="Rating"
                defaultValue={restaurantInformation.rating}
                onChange={(event) =>
                  setRestaurantInformation({
                    ...restaurantInformation,
                    rating: event.target.value,
                  })
                }
              />
            </section>

            <GenericButtons type="submit" backgroundColor="grey">
              SUBMIT
            </GenericButtons>
          </form>
        </>
      )}
      {props.type === "dish" && (
        <>
          <h3>{data ? "Edit a" : "Create new"} dish</h3>
          <form
            className="add_put_component_form"
            onSubmit={async (event) => {
              event.preventDefault();
              switch (props.action) {
                case "Add":
                  try {
                    const response = await axios.post(
                      "http://localhost:8000/api/dishes",
                      dishInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;

                case "Put":
                  try {
                    const response = await axios.put(
                      "http://localhost:8000/api/dishes",
                      dishInformation
                    );
                  } catch (error: any) {
                    alert(error.response.data);
                  }
                  break;
              }

              window.location.reload();
            }}>
            <section>
              <div>Name</div>
              <input
                placeholder="Name"
                defaultValue={dishInformation.name}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    name: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Image URL</div>
              <input
                placeholder="Image URL"
                defaultValue={dishInformation.img_url}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    img_url: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Changes</div>
              <input
                placeholder="Separated by ','"
                defaultValue={dishInformation.changes}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    changes: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Ingredients</div>
              <input
                placeholder="Separated by ','"
                defaultValue={dishInformation.ingredients}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    ingredients: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Price</div>
              <input
                placeholder="Price"
                defaultValue={dishInformation.price}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    price: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>
                <span>Vegan </span>
                <select
                  defaultValue={String(dishInformation.icons.isVegan)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      icons: {
                        ...dishInformation.icons,
                        isVegan: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
              <div>
                <span>Vegetarian </span>
                <select
                  defaultValue={String(dishInformation.icons.isVegetarian)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      icons: {
                        ...dishInformation.icons,
                        isVegetarian: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
              <div>
                <span>Spicy </span>
                <select
                  defaultValue={String(dishInformation.icons.isSpicy)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      icons: {
                        ...dishInformation.icons,
                        isSpicy: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
            </section>
            <section>
              <div>Side</div>
              <input
                placeholder="Side"
                defaultValue={dishInformation.sides}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    sides: event.target.value,
                  })
                }
              />
            </section>
            <section>
              <div>Is Signature</div>
              <select
                defaultValue={String(dishInformation.is_signature)}
                onChange={(event) =>
                  setDishInformation({
                    ...dishInformation,
                    is_signature: event.target.value === "true",
                  })
                }>
                <option value="true">True ✔️</option>
                <option value="false">False ❌</option>
              </select>
            </section>
            <section>
              <div>
                <span>Breakfast </span>
                <select
                  defaultValue={String(dishInformation.dishTiming.breakfast)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      dishTiming: {
                        ...dishInformation.dishTiming,
                        breakfast: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
              <div>
                <span>Lunch </span>
                <select
                  defaultValue={String(dishInformation.dishTiming.lunch)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      dishTiming: {
                        ...dishInformation.dishTiming,
                        lunch: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
              <div>
                <span>Dinner </span>
                <select
                  defaultValue={String(dishInformation.dishTiming.dinner)}
                  onChange={(event) =>
                    setDishInformation({
                      ...dishInformation,
                      dishTiming: {
                        ...dishInformation.dishTiming,
                        dinner: event.target.value === "true",
                      },
                    })
                  }>
                  <option value="true">True ✔️</option>
                  <option value="false">False ❌</option>
                </select>
              </div>
            </section>
            <GenericButtons type="submit" backgroundColor="grey">
              SUBMIT
            </GenericButtons>
          </form>
        </>
      )}
    </div>
  );
};

export default AddPutComponent;
