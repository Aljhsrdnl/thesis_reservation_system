import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import background_img from "../icons/bg-01.png";
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

// const handleLoginData = (e) => {
//   setLoginData({
//     ...loginData,
//     [e.target.name]: e.target.value,
//   });
// };
// const handleSubmission = (e) => {
//   e.preventDefault();
//   console.log(loginData);
//   dispatch(login(loginData));
// };
function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
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
              // autoComplete="off"
              placeholder="al"
              name="email"
              // =value={email}
              onChange={handleChangeInput}
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
              // value={password}
              onChange={handleChangeInput}
            />
            <label
              htmlFor="password"
              className="text-xs absolute left-0 -top-4 cursor-text transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600 peer-placeholder-shown:text-gray-400 text-green-600"
            >
              Password
            </label>
          </div>
          <button className={primaryBtn} type="submit">
            LOG IN
          </button>
          <Link to="/register">
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
}

export default Login;
