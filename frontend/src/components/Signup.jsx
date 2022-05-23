import React from "react";
import background_img from "../icons/bg-01.png";
import google_icon from "../icons/google_icon.png";

const Signup = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form">
        <form action="" className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-green-800 text-4xl font-bold mb-12">Sign Up</h1>
          <button className="flex justify-center rounded-lg border-green-600 border-2 text-green-600 py-2 w-full hover:bg-green-600 hover:text-white">
            <img src={google_icon} alt="google_icon" className="w-6 mr-4" />
            Sign Up with Google
          </button>
          <p className="text-gray-800 text-center m-12">-OR-</p>
          <input
            type="text"
            name="name"
            className="w-full p-2 border-gray-400 border-2 rounded-lg hover:border-green-400 focus:border-green-600 focus:text-green-600 mb-6"
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            className="w-full p-2 border-gray-400 border-2 rounded-lg hover:border-green-400 focus:border-green-600 focus:text-green-600 mb-6"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="w-full p-2 border-gray-400 border-2 rounded-lg hover:border-green-400 focus:border-green-600 focus:text-green-600 mb-6"
            placeholder="Password"
          />
          <button className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800">
            LOG IN
          </button>
          <small className="block w-full text-center mt-2 text-gray-800">
            Already have an account?
            <span className="text-green-600 font-semibold"> Log in here.</span>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Signup;
