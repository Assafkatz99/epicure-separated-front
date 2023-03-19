import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Clean_button,
  GenericButtons,
} from "../../typs/buttons/Styled_buttons";
import Footer from "../homepage/hp-components/footer/Footer";
import Navbar from "../navbar/Navbar";
import AddPutComponent from "./admin component/AddPutComponent";
import "./AdminSystem.css";

const AdminSystem: React.FC = () => {
  const [boldName, setBoldName] = useState("Restaurants");
  const chefs = useSelector((state: RootState) => state.chefs.value);
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.value
  );
  const dishes = useSelector((state: RootState) => state.dishes.value);

  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(<></>);

  return (
    <div className="admin_page">
      <section>
        <Navbar />
        <div className="admin_system_div">
          <div style={{ position: "relative" }} className="admin_buttons">
            <Clean_button
              name="Chefs"
              bold={boldName === "Chefs"}
              onClick={() => setBoldName("Chefs")}>
              Chefs
            </Clean_button>
            <Clean_button
              name="Restaurants"
              bold={boldName === "Restaurants"}
              onClick={() => setBoldName("Restaurants")}>
              Restaurants
            </Clean_button>
            <Clean_button
              name="Dishes"
              bold={boldName === "Dishes"}
              onClick={() => setBoldName("Dishes")}>
              Dishes
            </Clean_button>
            <GenericButtons
              onClick={() => {
                let action_type: "chef" | "rest" | "dish" = "dish";
                switch (boldName) {
                  case "Chefs":
                    action_type = "chef";
                    break;
                  case "Restaurants":
                    action_type = "rest";
                    break;
                  case "Dishes":
                    action_type = "dish";
                    break;
                }
                setModalComponent(
                  <AddPutComponent type={action_type} action={"Add"} />
                );
                setShowModal(true);
              }}
              style={{
                position: "absolute",
                right: "0",
                transform: " translate(-10px, -50%)",
                top: "50%",
                padding: "10px",
              }}
              backgroundColor="#29c821c1">
              Create {boldName}
            </GenericButtons>
          </div>
          {boldName === "Chefs" && (
            <div className="Chefs_table tables">
              <table>
                <tr style={{ background: "#93B1A7" }}>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th style={{ width: "200px" }}>About</th>
                  <th>Img_URL</th>
                  <th>Restaurants Ids</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {chefs
                  .slice()
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((chef) => {
                    return (
                      <tr>
                        <th># {chef.id}</th>
                        <th>{chef.first_name}</th>
                        <th>{chef.last_name}</th>
                        <th
                          style={{
                            minWidth: "300px",
                            fontSize: "10px",
                            whiteSpace: "normal",
                          }}>
                          {chef.about}
                        </th>
                        <th>
                          <a
                            href={chef.img_url}
                            target="_blank"
                            style={{
                              color: "blue",
                              fontSize: "12px",
                              textDecoration: "underline",
                            }}>
                            {chef.img_url}
                          </a>
                        </th>
                        <th>{chef.restaurant_ids.join(", ")}</th>
                        <th>
                          <button
                            onClick={() => {
                              setModalComponent(
                                <AddPutComponent
                                  type={"chef"}
                                  action={"Put"}
                                  data={chef}
                                />
                              );
                              setShowModal(true);
                            }}>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="/assets/icons/admin/edit.svg"
                            />
                          </button>
                        </th>
                        <th>
                          <button
                            onClick={async () => {
                              const result = window.confirm(
                                `Are you sure you want to delete this chef (chef id: #${chef.id}) ?`
                              );
                              if (result) {
                                try {
                                  const response = await axios.post(
                                    "http://localhost:8000/api/chefs/delete",
                                    { chef_id: chef.id }
                                  );
                                  console.log(response);
                                } catch (error: any) {
                                  alert(error.response.data);
                                }
                                window.location.reload()
                              }
                            }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="/assets/icons/admin/delete.svg"
                            />
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}
          {boldName === "Restaurants" && (
            <div className="Restaurants_table tables">
              <table>
                <tr style={{ background: "#93B1A7" }}>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Hours</th>
                  <th>Is favorite</th>
                  <th>Address</th>
                  <th>Rating</th>
                  <th>Dish Ids</th>
                  <th>Opening year</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {restaurants
                  .slice()
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((rest) => {
                    return (
                      <tr>
                        <th># {rest.id}</th>
                        <th
                          style={{
                            minWidth: "160px",
                            fontSize: "15px",
                            whiteSpace: "normal",
                          }}>
                          {rest.name}
                        </th>
                        <th>
                          {rest.hours.map((item) => `${item}:00`).join(" - ")}
                        </th>
                        <th>{rest.is_favorite ? "True ✔️" : "False ❌"}</th>
                        <th
                          style={{
                            minWidth: "200px",
                            fontSize: "10px",
                            whiteSpace: "normal",
                          }}>
                          {rest.address}
                        </th>
                        <th>
                          {"★".repeat(rest.rating)} ({rest.rating})
                        </th>
                        <th style={{ fontSize: "13px", whiteSpace: "normal" }}>
                          {rest.dish_ids.join(", ")}
                        </th>
                        <th>{rest.opening_year}</th>
                        <th>
                          <button
                            onClick={() => {
                              setModalComponent(
                                <AddPutComponent
                                  type={"rest"}
                                  action={"Put"}
                                  data={rest}
                                />
                              );
                              setShowModal(true);
                            }}>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="/assets/icons/admin/edit.svg"
                            />
                          </button>
                        </th>
                        <th>
                          <button onClick={async () => {
                              const result = window.confirm(
                                `Are you sure you want to delete this restaurant (restaurant id: #${rest.id}) ?`
                              );
                              if (result) {
                                try {
                                  const response = await axios.post(
                                    "http://localhost:8000/api/restaurants/delete",
                                    { rest_id: rest.id }
                                  );
                                  console.log(response);
                                } catch (error: any) {
                                  alert(error.response.data);
                                }
                                window.location.reload()
                              }
                            }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="/assets/icons/admin/delete.svg"
                            />
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}
          {boldName === "Dishes" && (
            <div className="Dishes_table tables">
              <table>
                <tr style={{ background: "#93B1A7" }}>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Img_Url</th>
                  <th>Changes</th>
                  <th>ingredients</th>
                  <th>price</th>
                  <th>Icons</th>
                  <th>sides</th>
                  <th>Is signature</th>
                  <th>Dish timing</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
                {dishes
                  .slice()
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((dish) => {
                    return (
                      <tr>
                        <th># {dish.id}</th>
                        <th>{dish.name}</th>
                        <th>
                          <a
                            href={dish.img_url}
                            target="_blank"
                            style={{
                              color: "blue",
                              fontSize: "12px",
                              textDecoration: "underline",
                            }}>
                            {dish.img_url}
                          </a>
                        </th>
                        <th
                          style={{
                            fontSize: "13px",
                            whiteSpace: "normal",
                          }}>
                          {dish.changes.join(", ")}
                        </th>
                        <th
                          style={{
                            minWidth: "300px",
                            fontSize: "10px",
                            whiteSpace: "normal",
                          }}>
                          {dish.ingredients.join(", ")}
                        </th>
                        <th>{dish.price}</th>
                        <th style={{ textOverflow: "unset" }}>
                          {Object.entries(dish.icons)
                            .filter(
                              (item) => item[0] !== "_id" && item[1] == true
                            )
                            .map((type) => (
                              <img
                                className="admin_table_icons"
                                src={
                                  "assets/icons/dishes_types_icons/" +
                                  type[0] +
                                  ".svg"
                                }
                                alt="icon_source"
                              />
                            ))}
                        </th>
                        <th
                          style={{
                            fontSize: "13px",
                            whiteSpace: "normal",
                          }}>
                          {dish.sides.join(", ")}
                        </th>
                        <th>{dish.is_signature ? "True ✔️" : "False ❌"}</th>
                        <th
                          style={{
                            fontSize: "13px",
                            whiteSpace: "normal",
                          }}>
                          {Object.entries(dish.dishTiming)
                            .map((item) => (item[1] ? item[0] : ""))
                            .filter((item) => item !== "" && item !== "_id")
                            .join(", ")}
                        </th>
                        <th>
                          <button
                            onClick={() => {
                              setModalComponent(
                                <AddPutComponent
                                  type={"dish"}
                                  action={"Put"}
                                  data={dish}
                                />
                              );
                              setShowModal(true);
                            }}>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src="/assets/icons/admin/edit.svg"
                            />
                          </button>
                        </th>
                        <th>
                          <button onClick={async () => {
                              const result = window.confirm(
                                `Are you sure you want to delete this dish (dish id: #${dish.id}) ?`
                              );
                              if (result) {
                                try {
                                  const response = await axios.post(
                                    "http://localhost:8000/api/dishes/delete",
                                    { dish_id: dish.id }
                                  );
                                  console.log(response);
                                } catch (error: any) {
                                  alert(error.response.data);
                                }
                                window.location.reload()
                              }
                            }}>
                            <img
                              style={{ width: "30px", height: "30px" }}
                              src="/assets/icons/admin/delete.svg"
                            />
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}

          {showModal && (
            <>
              <div
                className="backdrop"
                onClick={() => setShowModal(false)}></div>
              <div className="modalAddingEditing">{modalComponent}</div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminSystem;
