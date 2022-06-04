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
    // console.log(formData);
    dispatch(register(formData));
  };

  return (
    <div className="flex h-max   items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-full lg:w-7/12">
        <form action="" className="bg-white p-8 rounded-2xl shadow-lg ">
          <h1 className="text-green-800 text-4xl font-bold mb-12">Sign Up</h1>
          <button className={secondaryBtnIcon}>
            <img src={google_icon} alt="google_icon" className="w-6 mr-4" />
            Sign Up with Google
          </button>
          <p className="text-gray-800 text-center m-8">-OR-</p>
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="name"
              onChange={handleFormData}
            />
            <label
              htmlFor="name"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              Name
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              id="email"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="email"
              onChange={handleFormData}
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
              type="text"
              id="idNum"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="identification_num"
              onChange={handleFormData}
            />
            <label
              htmlFor="idNum"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              ID Number
            </label>
          </div>

          <div className="relative mb-6">
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleFormData}
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-green-600 focus:outline-none placeholder-transparent w-full text-gray-800"
            >
              <option value="WVSU Student">WVSU Student</option>
              <option value="WVSU Teacher">WVSU Teacher</option>
              <option value="Researcher">Researcher</option>
            </select>
            <label
              htmlFor="user_type"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              User Type
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
              onChange={handleFormData}
            />
            <label
              htmlFor="password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              Password
            </label>
          </div>
          {/* <input
            type="text"
            name="name"
            className={input_style}
            placeholder="Name"
            onChange={handleFormData}
          /> */}

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
