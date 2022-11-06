import React from "react";
import axios from "axios";
import background_img from "../../../icons/bg-01.jpg";
import google_icon from "../../../icons/google_icon.png";
import { Link } from "react-router-dom";
import { input_style, primaryBtn, secondaryBtnIcon } from "../../styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/inject-style";

const initialState = {
  name: "",
  email: "",
  user_type: "WVSU Student",
  identification_num: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
const Register = () => {
  const notify = (msg) => {
    toast(msg);
  };
  const [user, setUser] = useState(initialState);

  const {
    name,
    email,
    user_type,
    identification_num,
    password,
    cf_password,
    err,
    success,
  } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  // ------------------------->> Validation
  const [error, set_error] = useState(false);

  const handleSubmit = async (e) => {
    // notify();
    e.preventDefault();
    if (
      isEmpty(name) ||
      isEmpty(user_type) ||
      isEmpty(identification_num) ||
      isEmpty(password)
    ) {
      set_error(true);
    }

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        user_type,
        identification_num,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="flex h-max   items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-full lg:w-7/12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg "
        >
          <h1 className="text-primary-500 text-4xl font-bold mb-12">Sign Up</h1>

          {success && notify(success)}
          {user.err && (
            <div className="text-warning bg-warning-background border border-warning-border w-full px-4 py-2 rounded-sm mb-12">
              {user.err}
            </div>
          )}
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="name"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="name"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Name
            </label>
            {error && user.name == "" ? (
              <small className="text-warning">Please input your name.</small>
            ) : (
              " "
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              id="email"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="email"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="email"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Email
            </label>
            {error && user.email == "" ? (
              <small className="text-warning">
                Please input a valid email address.
              </small>
            ) : (
              " "
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              id="idNum"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="identification_num"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="idNum"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              ID Number
            </label>
            {error && user.identification_num === "" && (
              <small className="text-warning">
                Please input your ID number.
              </small>
            )}
          </div>

          <div className="relative mb-6">
            <select
              id="user_type"
              name="user_type"
              value={user.user_type}
              onChange={handleChangeInput}
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Researcher">Researcher</option>
            </select>
            <label
              htmlFor="user_type"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              User Type
            </label>
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="password"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Password
            </label>
            {error && user.password === "" ? (
              <small className="text-warning">Please input a password.</small>
            ) : isLength(password) ? (
              <small className="text-warning">
                Password must be atleast 6 characters.
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="cf_password"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="cf_password"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="cf_password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-500 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Confirm Password
            </label>
            {error && user.cf_password === "" ? (
              <small className="text-warning">
                Please confirm your password.
              </small>
            ) : user.cf_password != user.password ? (
              <small className="text-warning">Passwords do not match.</small>
            ) : (
              " "
            )}
          </div>

          <button className={primaryBtn} type="submit">
            SIGN UP
          </button>
          <Link to="/login">
            <small className="block w-full text-center mt-2 text-gray-800">
              Already have an account?
              <span className="text-primary-500 font-semibold">
                {" "}
                Login here.
              </span>
            </small>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
