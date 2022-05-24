import React from "react";
import background_img from "../icons/bg-01.png";
import google_icon from "../icons/google_icon.png";
import { Link } from "react-router-dom";
import { input_style, primaryBtn, secondaryBtnIcon } from "./styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../actions/authActions";

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "WVSU Student",
    identification_num: "",
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(formData));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-96">
        <form action="" className="bg-white p-8 rounded-2xl shadow-lg ">
          <h1 className="text-green-800 text-4xl font-bold mb-12">Sign Up</h1>
          <button className={secondaryBtnIcon}>
            <img src={google_icon} alt="google_icon" className="w-6 mr-4" />
            Sign Up with Google
          </button>
          <p className="text-gray-800 text-center m-8">-OR-</p>
          <input
            type="text"
            name="name"
            className={input_style}
            placeholder="Name"
            onChange={handleFormData}
          />
          <input
            type="text"
            name="email"
            className={input_style}
            placeholder="Email"
            onChange={handleFormData}
          />

          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleFormData}
            className={input_style}
          >
            <option value="WVSU Student">WVSU Student</option>
            <option value="WVSU Teacher">WVSU Teacher</option>
            <option value="Researcher">Researcher</option>
          </select>
          <input
            type="text"
            name="identification_num"
            className={input_style}
            placeholder="ID Number"
            onChange={handleFormData}
          />
          <input
            type="password"
            name="password"
            className={input_style}
            placeholder="Password"
            onChange={handleFormData}
          />
          <button className={primaryBtn} onClick={handleSubmit}>
            SIGN UP
          </button>
          <Link to="/login">
            <small className="block w-full text-center mt-2 text-gray-800">
              Already have an account?
              <span className="text-green-600 font-semibold"> Login here.</span>
            </small>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
