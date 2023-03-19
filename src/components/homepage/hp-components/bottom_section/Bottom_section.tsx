import React from "react";
import "./Bottom_section.css";

const Bottom_section: React.FC = () => {
  return (
    <div className="bottom_section_div">
      <div className="left_side_bottom_section">
        <span>ABOUT US:</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
          nostrum. Tempora suscipit eveniet ullam nisi, culpa quaerat labore
          soluta dolorum modi? Delectus itaque eveniet necessitatibus minima
          blanditiis eaque quibusdam aliquid iusto suscipit. Rerum voluptas
          ullam sequi incidunt? Eaque quia magni atque odio commodi rerum
          perferendis nulla asperiores aspernatur tempore illum officia optio
          dolores itaque odit similique ducimus, pariatur qui quasi in. Debitis
          facilis repellendus dicta at dolore. Totam optio ipsam molestias amet,
          cum fugiat assumenda beatae itaque inventore a omnis. <br /> <br />{" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam omnis
          consequuntur beatae, debitis eum porro quaerat facere iusto. Enim
          architecto sunt quae! Voluptatum minima nam quia quam et iure aperiam.
        </p>
        <section className="apple_google_store_icons">
          <img src="assets/icons/bottom_svgs/app_store.svg" />
          <img src="assets/icons/bottom_svgs/play_store.svg" />
        </section>
      </div>
      <img src="assets/icons/bottom_svgs/epicure_big_logo.svg" />
    </div>
  );
};

export default Bottom_section;
