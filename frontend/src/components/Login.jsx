import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import background_img from "../icons/bg-01.png";
import google_icon from "../icons/google_icon.png";
import { Link } from "react-router-dom";
import { input_style, primaryBtn, secondaryBtnIcon } from "./styles";

//action
import { login } from "../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(loginData);
    dispatch(login(loginData));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-7/12">
        <form action="" className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-green-800 text-4xl font-bold mb-12">Login</h1>
          <button className={secondaryBtnIcon}>
            <img src={google_icon} alt="google_icon" className="w-6 mr-4" />
            Login with Google
          </button>
          <p className="text-gray-800 text-center m-12">-OR-</p>
          <div className="relative mb-6">
            <input
              type="text"
              id="email"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="email"
              onChange={handleLoginData}
            />
            <label
              htmlFor="email"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              Email
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="password"
              onChange={handleLoginData}
            />
            <label
              htmlFor="password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              Password
            </label>
          </div>
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
