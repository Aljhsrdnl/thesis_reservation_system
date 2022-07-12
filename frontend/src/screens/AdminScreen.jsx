import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReservationScreen from "./ReservationScreen";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
} from "../redux/actions/userAction";

function AdminScreen() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;

  const [callback, setCallback] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
    }
  }, [token, isAdmin, dispatch, callback]);

  return <div>{isAdmin && <ReservationScreen />}</div>;
}

export default AdminScreen;
