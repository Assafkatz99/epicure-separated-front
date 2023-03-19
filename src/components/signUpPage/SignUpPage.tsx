import { UnknownAsyncThunkAction } from "@reduxjs/toolkit/dist/matchers";
import axios from "axios";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GenericButtons } from "../../typs/buttons/Styled_buttons";
import IUser from "../../typs/interfaces/IUser";
import Footer from "../homepage/hp-components/footer/Footer";
import Navbar from "../navbar/Navbar";
import "./SignUpPage.css";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  let user_details: IUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  return (
    <>
      <div className="sign_up_page">
        <Navbar></Navbar>
        <div className="sign_up_div">
          <div className="head_part">
            <span>SIGN UP</span>
            <label>To continue the order, please sign up</label>
          </div>

          <form
            onSubmit={async (event: any) => {
              event.preventDefault();
              user_details = {
                first_name: event.target[0].value,
                last_name: event.target[1].value,
                email: event.target[2].value,
                password: event.target[3].value,
              };

              try {
                const response = await axios.post(
                  "http://localhost:8000/api/users/sign-up",
                  user_details
                );
                if (response.status === 201) {
                  alert(response.data)
                  navigate("/sign-in");
                } else {
                  alert(response.data);
                }
              } catch (error: any) {
                alert(error.response.data);
              }
            }}
          >
            <input placeholder="First name" type="text" />
            <input placeholder="Last name" type="text" />
            <input placeholder="Email address" type="text" />
            <input placeholder="Password" type="text" />

            <GenericButtons backgroundColor="white" type="submit">
              SIGN UP
            </GenericButtons>
          </form>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default SignInPage;
