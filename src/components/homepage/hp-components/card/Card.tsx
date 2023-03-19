import React from "react";
import ICard from "../../../../typs/interfaces/ICard";
import "./Card.css";

const Card: React.FC<ICard> = (props) => {
  return (
    <div className={`card ${props.class}`} onClick={props.onclick}>
      <img className="card_img" src={props.img} alt="rest/dish_img" />
      <div className="card_bottom_div">
        <h3>{props.name}</h3>

        {props.icons && Object.values(props.icons).includes(true) && (
          <section className="icons_section">
            {Object.entries(props.icons).map(
              (icon: Array<string | boolean>, index: number) =>
                icon[1] == true ? (
                  <img
                    key={index}
                    className="icon"
                    src={`/assets/icons/dishes_types_icons/${icon[0]}.svg`}
                    alt="icons"
                  />
                ) : null
            )}
          </section>
        )}

        <h2>
          {props.chefName ? props.chefName : props.dishDescription?.join(", ")}
        </h2>
        {props.rating ? (
          <section>
            {
              <img
                className="rating"
                src={
                  "/assets/icons/rating_svgs/rate-" +
                  props.rating.toString() +
                  ".svg"
                }
                alt="rating"
              />
            }
          </section>
        ) : null}
        {props.price ? (
          <div className="pricing">
            <hr />
            <p>₪{props.price}</p>
            <hr />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
