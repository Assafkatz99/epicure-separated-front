import React from "react";
import "./Small_rest_card.css";

interface ISmall_card {
  rest_img: string;
  rest_name: string;
  onclick?: () => void;
}

const Small_rest_card: React.FC<ISmall_card> = (props) => {
  return (
    <div className="rest_small_card" onClick={props.onclick}>
      <img src={props.rest_img} alt="small_rest_img" />

      <div className="botton_small_card_div">
        <span>{props.rest_name}</span>
      </div>
    </div>
  );
};

export default Small_rest_card;
