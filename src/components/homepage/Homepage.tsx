import React from "react";
import "./homepage.css";

import Navbar from "../navbar/Navbar";
import Hero from "./hp-components/hero-component/Hero";
import Popular_restaurant from "./hp-components/popular-restaurant/Popular_restaurant";
import Popular_dishes from "./hp-components/popular-dishes/Popular_dishes";
import Icons from "./hp-components/icons/Icons";
import Chef_of_the_week from "./hp-components/Chef_of_the_week/Chef_of_the_week";
import Bottom_section from "./hp-components/bottom_section/Bottom_section";
import Footer from "./hp-components/footer/Footer";

const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Popular_restaurant />
      <Popular_dishes />
      <Icons />
      <Chef_of_the_week />
      <Bottom_section />
      <Footer />
    </>
  );
};

export default Homepage;
