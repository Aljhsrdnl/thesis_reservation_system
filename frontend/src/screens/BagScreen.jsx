import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import { primaryBtn } from "../components/styles";
import EmptyCart from "../icons/empty-bag.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//actions
import { getCart } from "../redux/actions/bagAction";

//component
import ItemInBag from "../components/ItemInBag";

const BagScreen = () => {
  //Lottie File
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyCart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const getBagData = useSelector((data) => data.bag);
  const { bag, isLoading } = getBagData;

  //data--bag
  const dispatch = useDispatch();

  // //data--user
  const getUserData = useSelector((data) => data.auth);
  const { user } = getUserData;

  useEffect(() => {
    if (user._id !== undefined) {
      dispatch(getCart(user._id));
    }
  }, [user]);

  return (
    <div className="absolute right-0 w-full lg:w-2/4 bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl text-green-800 font-bold mb-6">Bag</h1>

      <div className="grid-cols-1 gap-6 grid auto-row-fr ">
        {isLoading ? <p>Loading</p> : <ItemInBag />}
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : (
          bag.items_in_bag.map((i) => <ItemInBag key={i._id} />)
        )} */}

        {/* <Lottie options={defaultOptions} width={300} height={300} /> */}
        <p className="text-gray-400 text-center">
          Your bag is currently empty.
          <Link to="/" className="underline pl-2">
            Start adding some items.
          </Link>
        </p>
      </div>
      {/* the button reserve will only show up if the cart is not empty */}
      {/* <button className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 mt-6">
        RESERVE
      </button> */}
    </div>
  );
};

export default BagScreen;