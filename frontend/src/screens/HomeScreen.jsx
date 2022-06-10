import React from "react";

//components
import ItemCard from "../components/ItemCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//actions
import { getItems } from "../redux/actions/itemAction";
import Lottie from "react-lottie";
import loading from "../icons/loading.json";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const getItemsData = useSelector((data) => data.item);

  const { items, isLoading } = getItemsData;
  console.log(isLoading);

  const apparatus = items.filter((item) => item.category == "Apparatus");
  const equipment = items.filter((item) => item.category == "Equipment");

  //Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="text-3xl text-green-800 font-bold mb-4">Equipment</h1>
      <div className="itemDiv grid grid-cols-1 lg:grid-cols-2 gap-6 auto-row-fr mb-8 border-b-2 border-green-400 pb-8">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          // <div className="">
          //   <Lottie options={defaultOptions} width={100} height={100} />
          // </div>
          equipment.map((e) => (
            <ItemCard
              name={e.name}
              category={e.category}
              key={e._id}
              itemID={e._id}
              a_quantity={e.avail_quantity}
            />
          ))
        )}
      </div>
      <h1 className="text-3xl text-green-800 font-bold mb-4">Apparatus</h1>
      <div className="itemDiv grid grid-cols-1 lg:grid-cols-2 gap-6 auto-row-fr ">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          apparatus.map((e) => (
            <ItemCard
              name={e.name}
              category={e.category}
              key={e._id}
              itemID={e._id}
              a_quantity={e.avail_quantity}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
