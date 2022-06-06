import React from "react";
import { addToCart } from "../redux/actions/bagAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCard = ({ name, category, itemID, a_quantity }) => {
  const dispatch = useDispatch();
  const auth = useSelector((data) => data.auth);
  const { user } = auth;

  const handleAddToCart = () => {
    dispatch(addToCart(user._id, itemID, 1, name));
    activateToaster();
    // console.log(user._id);
  };

  //Toastify
  const activateToaster = () => {
    toast("Item added to bag.", {
      position: "top-right",
      autoClose: 3500,
      icon: "👍",
      hideProgressBar: true,
    });
  };
  return (
    <div className=" bg-white rounded-lg shadow-lg transition-shadow  hover:scale-105 transition-scale">
      {/* <div
        className="w-full bg-gray-400 h-36 bg-center bg-cover rounded-tl-xl rounded-tr-xl"
        style={{ backgroundImage: `url(${imgURL})` }}
      ></div> */}
      <div className="flex item-center justify-center details p-3">
        <div className="flex-1">
          {/* <p className="text-gray-400">{category}</p> */}
          <h1 className="text-green-600 font-bold text-xl">{name}</h1>
          <p className="text-gray-600 text-sm">
            Available quantity: {a_quantity}
          </p>
        </div>
        {/* <button
          className=" rounded bg-green-600 text-white p-2 px-4 hover:bg-green-800 my-2"
          onClick={handleAddToCart}
        >
          RESERVE
        </button> */}
        <Link to="/">
          <button
            className=" rounded bg-green-600 text-white p-2 px-4 hover:bg-green-800 my-2"
            onClick={handleAddToCart}
          >
            ADD ITEM
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
