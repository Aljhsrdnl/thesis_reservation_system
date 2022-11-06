import React from "react";
import axios from "axios";
import usePortal from "react-cool-portal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import loadingJSON from "../icons/loading.json";
import "./search.css";
import Lottie from "react-lottie-player";
//components
import ItemCard from "../components/ItemCard";
import Ticket from "../components/Ticket";
//actions
import { getItems } from "../redux/actions/itemAction";
// import Lottie from "react-lottie";
// import loading from "../icons/loading.json";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const getItemsData = useSelector((data) => data.item);
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;
  let userId;

  const { items, isLoading } = getItemsData;

  const apparatus = items.filter((item) => item.category == "Apparatus");
  const equipment = items.filter((item) => item.category == "Equipment");

  // search
  const [query, setQuery] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchApparatus = event.target.value;
    setWordEntered(searchApparatus);
    const newFilter = items.filter((value) => {
      return value.name.toLowerCase().includes(searchApparatus.toLowerCase());
    });

    setQuery(newFilter);
  };
  const clearInput = () => {
    setQuery([]);
    setWordEntered("");
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  // sidebar
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false,
    internalShowHide: false,
    onShow: (e) => {},
    onHide: (e) => {},
  });

  let [reservation, setReservation] = useState([]);

  if (loading === undefined) {
    return;
  } else {
    userId = user._id;
    axios.get(`/get_reservation/${userId}`).then((data) => {
      setReservation(data.data);
    });
  }
  return (
    <div>
      <div className="flex">
        <div className="w-full lg:w-8/12">
          <div className="search">
            <div className="searchInputs">
              <input
                input
                type="text"
                placeholder="Search an Item..."
                value={wordEntered}
                onChange={handleFilter}
              />
              <div className="searchIcon">
                {wordEntered.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </div>
            {wordEntered.length !== 0 && (
              <div className="itemDiv grid grid-cols-1 md:grid-cols-2 gap-6 auto-row-fr mb-8 pb-8">
                {query.length !== 0 ? (
                  query.map((value, key) => {
                    return (
                      <ItemCard
                        name={value.name}
                        category={value.category}
                        key={value._id}
                        itemID={value._id}
                        a_quantity={value.avail_quantity}
                      />
                    );
                  })
                ) : (
                  <span className="error">No result found</span>
                )}
              </div>
            )}
          </div>
          {wordEntered.length === 0 && (
            <h1 className="text-3xl text-primary-500 font-bold mb-4">
              Equipment
            </h1>
          )}
          {wordEntered.length === 0 && (
            <div className="itemDiv grid grid-cols-1 md:grid-cols-2 gap-6 auto-row-fr mb-8 border-b-2 border-gray-300 pb-8">
              {isLoading ? (
                // <h2>Loading...</h2>

                <Lottie
                  loop
                  animationData={loadingJSON}
                  play
                  style={{ height: 150 }}
                />
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
          )}
          {wordEntered.length === 0 && (
            <h1 className="text-3xl text-primary-500 font-bold mb-4">
              Apparatus
            </h1>
          )}
          {wordEntered.length === 0 && (
            <div className="itemDiv grid grid-cols-1 md:grid-cols-2 gap-6 auto-row-fr ">
              {isLoading ? (
                // <h2>Loading...</h2>
                <Lottie
                  loop
                  animationData={loadingJSON}
                  play
                  style={{ height: 150 }}
                />
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
          )}
        </div>
        <div className="reservation_tab pl-6 w-4/12 hidden lg:block">
          <div className="bg-secondary-300 h-4 w-full rounded-t-md"></div>
          <div className="bg-gray-50 w-full rounded-b-md h-full px-4 py-2">
            <p className="text-primary-500 text-2xl font-bold mb-4">
              Reservations
            </p>
            {reservation.length > 0 ? (
              reservation.map((r) => (
                <Ticket
                  key={r._id}
                  ticketID={r._id}
                  qty={r.quantity_to_borrow}
                  name={r.itemName}
                  borrowDate={r.borrowDate}
                  returnDate={r.returnDate}
                  status={r.status}
                  remarks={r.remarks}
                  circle_style_up="w-6 h-6 rounded-full bottom-11 -right-3 absolute bg-gray-50"
                  circle_style_down="circle w-6 h-6 rounded-full bottom-11 -left-3 absolute bg-gray-50"
                />
              ))
            ) : (
              <p>No Reservation yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
