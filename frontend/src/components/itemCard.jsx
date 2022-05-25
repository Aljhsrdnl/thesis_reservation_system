import React from "react";

const itemCard = ({ name, category, itemID }) => {
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
        <button className=" rounded bg-green-600 text-white p-2 hover:bg-green-800 my-2">
          ADD ITEM
        </button>
      </div>
    </div>
  );
};

export default itemCard;
