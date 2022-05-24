import React from "react";
import { useState } from "react";
import background_img from "../icons/bg-01.png";
import google_icon from "../icons/google_icon.png";
import { Link } from "react-router-dom";
import { input_style, primaryBtn, secondaryBtnIcon } from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-96">
        <form action="" className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-green-800 text-4xl font-bold mb-12">Login</h1>
          <button className={secondaryBtnIcon}>
            <img src={google_icon} alt="google_icon" className="w-6 mr-4" />
            Login with Google
          </button>
          <p className="text-gray-800 text-center m-12">-OR-</p>
          <input
            type="text"
            name="email"
            className={input_style}
            placeholder="Email"
            onChange={emailChange}
          />
          <input
            type="password"
            name="password"
            className={input_style}
            placeholder="Password"
            onChange={passwordChange}
          />
          <button className={primaryBtn} onClick={handleSubmission}>
            LOG IN
          </button>
          <Link to="/signup">
            <small className="block w-full text-center mt-2 text-gray-800">
              Don't have an account?{" "}
              <span className="text-green-600 font-semibold">
                Register here.
              </span>
            </small>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
