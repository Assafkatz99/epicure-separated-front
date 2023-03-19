import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GenericButtons } from "../../typs/buttons/Styled_buttons";
import Footer from "../homepage/hp-components/footer/Footer";
import Navbar from "../navbar/Navbar";
import "./SignInPage.css";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const loginClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/sign-in",
        { email, password }
      );
      if (response.status === 201) {
        sessionStorage.setItem("user", JSON.stringify(response.data));

        alert("Welcome!");

        navigate("/");
      } else {
        alert(response.data);
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="sign_in_page">
        <Navbar />
        {user === null && (
          <div className="sign_in_div">
            <div className="head_part">
              <span>SIGN IN</span>
              <label>To continue the order, please sign in</label>
            </div>
            <input
              placeholder="Email address"
              type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <section>
              <GenericButtons
                backgroundColor="grey"
                onClick={() => {
                  loginClick();
                }}
              >
                LOGIN
              </GenericButtons>
              <button className="forget_pass_button">Forget password?</button>
            </section>
            <div className="or_class">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <GenericButtons
              backgroundColor="white"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              SIGN UP
            </GenericButtons>
          </div>
        )}
        {user && (
          <>
            <div className="sign_in_div" style={{ height: "auto" }}>
              <div className="head_part">
                <span>Hey {user.user.first_name}!</span>
                <label>
                  You are currently logged in to our system. <br />
                  <br /> If you wish to log-out please use the button below
                </label>
                <GenericButtons
                  backgroundColor="white"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  ADMIN
                </GenericButtons>
                <GenericButtons
                  backgroundColor="grey"
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                  }}
                >
                  LOG OUT
                </GenericButtons>
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default SignInPage;
