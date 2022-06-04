import React from "react";
import { addToCart } from "../redux/actions/bagAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ItemCard = ({ name, category, itemID }) => {
  const dispatch = useDispatch();
  const auth = useSelector((data) => data.auth);
  const { user } = auth;

  const handleAddToCart = () => {
    dispatch(addToCart(user._id, itemID, 1, name));
    // console.log(user._id);
  };
  return (
    <div className=" bg-white rounded-lg shadow-lg transition-shadow  hover:scale-105 transition-scale">
      {/* <div
        className="w-full bg-gray-400 h-36 bg-center bg-cover rounded-tl-xl rounded-tr-xl"
        style={{ backgroundImage: `url(${imgURL})` }}
      ></div> */}
      <div className="flex item-center justify-center details p-3">
        <div className="flex-1">
          <p className="text-gray-500">{category}</p>
          <h1 className="text-green-600 font-bold text-xl">{name}</h1>
        </div>
        <button
          className=" rounded bg-green-600 text-white p-2 hover:bg-green-800 my-2"
          onClick={handleAddToCart}
        >
          ADD ITEM
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
