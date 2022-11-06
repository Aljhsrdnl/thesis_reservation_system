import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import background_img from "../icons/bg-01.jpg";
import google_icon from "../icons/google_icon.png";
import { Link, useNavigate } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { input_style, primaryBtn, secondaryBtnIcon } from "./styles";

//action
// import { login } from "../actions/authActions";
import { dispatchLogin } from "../redux/actions/authAction";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

console.log("Login");
function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  // ----------------------------->> Validation
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setError(true);
      return;
    } else {
      try {
        const res = await axios.post("/user/login", { email, password });

        setUser({ ...user, err: "", success: res.data.msg });
        localStorage.setItem("firstLogin", true);

        dispatch(dispatchLogin());
        navigate("/");
        // console.log(user.success);
      } catch (err) {
        err.response.data.msg &&
          setUser({ ...user, err: err.response.data.msg, success: "" });
      }
    }
  };
  return (
    <div className="flex h-max items-center justify-center">
      <div className="imageHolder hidden lg:block lg:w-1/2">
        <img src={background_img} alt="scientist_pic" />
      </div>
      <div className="div_form w-7/12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h1 className="text-primary-500 text-4xl font-bold mb-12">Login</h1>

          {user.err && (
            <div className="text-warning bg-warning-background border border-warning-border w-full px-4 py-2 rounded-sm mb-8">
              {user.err}
            </div>
          )}
          <div className="relative mb-6">
            <input
              type="text"
              id="email"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              // autoComplete="off"
              placeholder="al"
              name="email"
              onChange={handleChangeInput}
            />
            <label
              htmlFor="email"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-600 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Email
            </label>
            {error && user.email === "" ? (
              <small className="text-warning">
                Please enter a valid email address.
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              className="peer border-b py-1 transition-colors focus:border-b-2 focus:border-primary-500 focus:outline-none placeholder-transparent w-full text-gray-800"
              autoComplete="off"
              placeholder="al"
              name="password"
              // value={password}
              onChange={handleChangeInput}
            />
            <label
              htmlFor="password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-600 peer-placeholder-shown:text-gray-400 text-primary-500"
            >
              Password
            </label>
            {error && user.password === "" ? (
              <small className="text-warning">
                Please input your password.
              </small>
            ) : (
              ""
            )}
          </div>
          <button className={primaryBtn} type="submit">
            LOG IN
          </button>
          <Link to="/register">
            <small className="block w-full text-center mt-2 text-gray-800">
              Don't have an account?{" "}
              <span className="text-primary-500 font-semibold">
                Register here.
              </span>
            </small>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
