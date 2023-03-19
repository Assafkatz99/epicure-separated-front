import React from "react";
import "./Icons.css";

const Icons: React.FC = () => {
  const dishes_types = ["isSpicy", "isVegetarian", "isVegan"];
  return (
    <div className="grey_icons_div">
      <span>THE MEANING OF OUR ICONS:</span>
      <div className="icons_div">
        {dishes_types.map((type) => (
          <section className={type}>
            <img
              src={"assets/icons/dishes_types_icons/" + type + ".svg"}
              alt="icon_source"
            />
            <p>{type.slice(2)}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Icons;
