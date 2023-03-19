import React from "react";
import { IOrder } from "../../../../../typs/interfaces/slicersInterfaces";
import "./ShoppingBagCard.css";

interface ShoppingBagCardProps {
  order: IOrder;
}

const ShoppingBagCard: React.FC<ShoppingBagCardProps> = (props) => {
  const orderChanges =
    Array.isArray(props.order.changes) && props.order.changes.length > 1
      ? props.order.changes
          .map((change) => change.charAt(0).toUpperCase() + change.slice(1))
          .join(" | ")
      : "";
  return (
    <div className="dish_shopping_bag_card">
      <img src={props.order.img_url} alt="dish_img" />
      <div className="right_side_dish_card">
        <div className="upper_part_dish_card">
          <div className="quantity_square">{props.order.quantity}</div>
          <section>
            <h1
              style={{
                fontWeight: "bold",
                letterSpacing: "0.8px",
                fontSize: "20px",
              }}
            >
              {props.order.name}
            </h1>
            <span>₪{props.order.price}.00</span>
          </section>
        </div>
        <span className="order_changes_span">{orderChanges}</span>
      </div>
      <h1
        className="right_button_price"
        style={{
          fontWeight: "bold",
          letterSpacing: "0.8px",
          fontSize: "20px",
        }}
      >
        ₪
        {props.order.quantity &&
          props.order.price &&
          props.order.price * props.order.quantity}
      </h1>
    </div>
  );
};

export default ShoppingBagCard;
