import React from "react";

const itemCard = ({ imgURL, name }) => {
  return (
    <div className=" bg-white rounded-lg shadow-lg transition-shadow  hover:scale-105 transition-scale">
      <div
        className="w-full bg-gray-400 h-36 bg-center bg-cover rounded-tl-xl rounded-tr-xl"
        style={{ backgroundImage: `url(${imgURL})` }}
      ></div>
      <div className="details p-3">
        <p className="text-gray-500">Laboratory Tools</p>
        <h1 className="text-green-600 font-bold text-xl">{name}</h1>
        <button className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-800 mt-3">
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

export default itemCard;
