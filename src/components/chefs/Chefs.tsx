import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Clean_button } from "../../typs/buttons/Styled_buttons";
import { IChef } from "../../typs/interfaces/slicersInterfaces";
import Chef_img_card from "../homepage/hp-components/Chef_img_card/Chef_img_card";
import Footer from "../homepage/hp-components/footer/Footer";
import Navbar from "../navbar/Navbar";
import "./Chefs.css";
import { RootState } from "../../store/store";
import { fetchChefs } from "../../store/slicers/chefsSlicer";
import { useDispatch } from "react-redux";

const Chefs: React.FC = () => {
  const [boldName, setBoldName] = useState("all");

  const chefs = useSelector((state: RootState) => state.chefs.value);

  return (
    <>
      <Navbar />

      <div className="filters">
        <div className="buttons">
          <Clean_button
            name="all"
            bold={boldName === "all"}
            onClick={() => setBoldName("all")}
          >
            All
          </Clean_button>
          <Clean_button
            name="new"
            bold={boldName === "new"}
            onClick={() => setBoldName("new")}
          >
            New
          </Clean_button>
          <Clean_button
            name="most_viewed"
            bold={boldName === "most_viewed"}
            onClick={() => setBoldName("most_viewed")}
          >
            Most Viewed
          </Clean_button>
        </div>
      </div>

      <div className="chefs_grid_div">
        <div className="chefs_grid">
          {chefs.map((chef: IChef) => (
            <Chef_img_card
              layout="chef_page"
              chef_f_name={chef.first_name}
              chef_l_name={chef.last_name}
              chef_img_src={chef.img_url}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chefs;
