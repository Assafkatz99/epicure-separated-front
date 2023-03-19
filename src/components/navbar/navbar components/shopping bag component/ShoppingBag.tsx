import { IOType } from "child_process";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { ShoppingBagButtons } from "../../../../typs/buttons/Styled_buttons";
import { IOrder } from "../../../../typs/interfaces/slicersInterfaces";
import "./ShoppingBag.css";
import ShoppingBagCard from "./ShoppingBagCard component/ShoppingBagCard";

const ShoppingBag: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.value);
  const [orderTotalPrice, SetOrderTotalPrice] = useState(0);
  useEffect(() => {
    let orders_total_amount = orders.reduce(
      (acc, curr: any) => acc + curr.price * curr.quantity,
      0
    );
    SetOrderTotalPrice(orders_total_amount);
  }, [orders]);
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate()
  return (
    <div className="shopping_bag">
      {orders.length === 0 && (
        <>
          <div className="empty_bag_div">
            <img src="/assets/logos/big_grey_shopping_bag.svg"></img>
            <span>YOUR BAG IS EMPTY</span>
          </div>
          <ShoppingBagButtons backgroundColor="white" >
            ORDER HISTORY
          </ShoppingBagButtons>
        </>
      )}
      {orders.length >= 1 && (
        <>
          <h3 style={{ fontWeight: "bold", letterSpacing: "0.8px" }}>
            YOUR ORDER
          </h3>
          {user != null && (
            <h2 style={{ color: "grey" }}>{user.user.first_name}</h2>
          )}
          <div className="dishes_div">
            {orders.map((order: any) => {
              return <ShoppingBagCard order={order} />;
            })}
          </div>
          <hr className="horizontal_line"></hr>
          <h2 style={{ fontWeight: "bold", letterSpacing: "0.8px" }}>
            Add A Comment
          </h2>
          <textarea placeholder="Special requests, allergies, detary restrictions, etc."></textarea>
          <div className="shopping_bag_buttons">
            <ShoppingBagButtons
              className="shopping_bag_buttons"
              backgroundColor="black"
              onClick={()=>{if(!user){
                alert("please sign-in to continue with your purchase") 
                navigate("/sign-in")
              }}}
            >
              CHECKOUT ₪{orderTotalPrice}
            </ShoppingBagButtons>
            <ShoppingBagButtons
              className="shopping_bag_buttons"
              backgroundColor="white"
            >
              ORDER HISTORY
            </ShoppingBagButtons>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingBag;
