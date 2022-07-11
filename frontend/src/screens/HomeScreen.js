import React from "react";
import axios from "axios";
import usePortal from "react-cool-portal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//components
import ItemCard from "../components/ItemCard";
import Ticket from "../components/Ticket";
//actions
import { getItems } from "../redux/actions/itemAction";
// import Lottie from "react-lottie";
// import loading from "../icons/loading.json";
import Filter from "./Filter";

function HomeScreen() {
  const dispatch = useDispatch();
  const getItemsData = useSelector((data) => data.item);
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;
  let userId;

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [callback, setCallback] = useState(false);
  const [result, setResult] = useState(0);

  // const apparatus = items.filter((item) => item.category == "Apparatus");
  // const equipment = items.filter((item) => item.category == "Equipment");

  useEffect(() => {
    const getItems = async () => {
      const res = await axios.get(
        "api/items?limit=${page*9}&${category}&name[regex]=&{search}"
      );
      setItems(res.data.items);
      console.log(res);
    };
    getItems();
  }, [callback]);

  // sidebar
  // const { Portal, isShow, show, hide, toggle } = usePortal({
  //   defaultShow: false,
  //   internalShowHide: false,
  //   onShow: (e) => {},
  //   onHide: (e) => {},
  // });

  // let [reservation, setReservation] = useState([]);

  // if (loading === undefined) {
  //   return;
  // } else {
  //   userId = user._id;
  //   axios.get(`/get_reservation/${userId}`).then((data) => {
  //     setReservation(data.data);
  //   });
  // }
  return {
    items: [items, setItems],
    callback: [callback, setCallback],
    category: [category, setCategory],
    search: [search, setSearch],
    result: [result, setResult],
  };
}

export default HomeScreen;
