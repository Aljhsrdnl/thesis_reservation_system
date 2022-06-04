import React from "react";
import { useState } from "react";

const ItemInBag = () => {
  let [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    quantity != 1 && setQuantity(quantity - 1);
  };

  return (
    <div className="flex max-w-full bg-white shadow-lg rounded-lg px-4 py-3 items-center">
      <div className="flex-grow">
        <p className="text-gray-400">Laboratory Tool</p>
        <h1 className="text-green-600 font-bold text-xl">Test Tube</h1>
      </div>
      <div className="block w-28">
        <div className="flex justify-center items-center">
          <button
            className="text-2xl text-green-800 mt-0 pt-0 hover:text-white hover:bg-green-600 px-3 rounded"
            onClick={handleMinus}
          >
            -
          </button>
          <p className="px-4 text-green-600 font-bold text-xl">{quantity}</p>
          <button
            className="text-2xl text-green-800 mt-0 pt-0 hover:text-white hover:bg-green-600 px-3 rounded"
            onClick={handlePlus}
          >
            +
          </button>
        </div>
        <button className="w-full mt-2 block mx-auto px-2 border border-green-600 rounded text-green-600 hover:bg-green-600 hover:text-white">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default ItemInBag;
