import React from "react";
import "./hero.css";

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <img src="\assets\images\hero-picture 1.svg" alt="hero_img" />
      <div className="hero-search-div">
        <span>Epicure works with the top chef restaurants in Tel Aviv</span>
        <input
          type="text"
          name="hero-search"
          placeholder="Search for restaurant cuisine, chef"
        />
      </div>
    </div>
  );
};

export default Hero;
