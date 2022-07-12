import React, { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    listReservations,
    deleteReservations,
  } from '../redux/actions/reserveAction';
  
  
  
  function ReservationScreen(props) {
  const reservationList = useSelector((state) => state.reservationList);
  
  const { loading, reservations, error } = reservationList;


  const reservationDelete = useSelector((state) => state.reservationDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = reservationDelete;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listReservations());
    return () => {
      //
    };
  }, [successDelete]);
  const deleteHandler = (reservation) => {
    dispatch(deleteReservations(reservation._id));
  };

  
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="reservation-header">
        <h3>Reservations</h3>
      </div>
      <div className="reservation-list">

        <table className="table-auto border-x border-b w-full">
          <thead  >
            <tr className='bg-green-600 text-white'>
              <th className="py-2 text-left font-semibold">Reservation ID</th>
              <th className="py-2 text-left font-semibold">Reserver's Name</th>
              <th className="py-2 text-left font-semibold">Reserver's ID</th>
              <th className="py-2 text-left font-semibold">Item Name</th>
              <th className="py-2 text-left font-semibold">Quantity</th>
              <th className="py-2 text-left font-semibold">Borrow Date</th>
              <th className="py-2 text-left font-semibold">Borrow Time</th>
              <th className="py-2 text-left font-semibold">Return Date</th>
              <th className="py-2 text-left font-semibold">Return Time</th>
              <th className="py-2 text-left font-semibold">Status</th>
              <th className="py-2 text-left font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? <h1>No Reservations</h1> : reservations.map(reservation => (<tr key={reservation._id} className="border-y">
              <td className="py-2 text-gray-800 text-sm">{reservation._id}</td>
              <td className="py-2 text-gray-800 text-sm">{reservation.user.name}</td>
              <td className="py-2 text-gray-800 text-sm">{reservation.user.identification_num}</td>
              <td className="py-2 text-gray-800 text-sm">{reservation.itemName}</td>
              <td className="py-2 text-gray-800 text-sm text-center">{reservation.quantity_to_borrow} pcs.</td>
             
              
              <td className="py-2 text-gray-800 text-sm">{moment(`${reservation.borrowDate}`).format("MMM D[,] YYYY")}</td>
              <td className="py-2 text-gray-800 text-sm">{moment(`${reservation.borrowDate}`).format("hh[:]mm A")}</td>
              <td className="py-2 text-gray-800 text-sm">{moment(`${reservation.returnDate}`).format("MMM D[,] YYYY")}</td>
              <td className="py-2 text-gray-800 text-sm">{moment(`${reservation.returnDate}`).format("hh[:]mm A")}</td>
              {reservation.status === 'Pending' ? <td className="py-2 text-yellow-200 bg-yellow-100 text-center text-sm">{reservation.status}</td> : reservation.status === 'Approved' ?<td className="py-2 text-success-200 bg-success-100 text-center text-sm">{reservation.status}</td> : <td className="py-2 text-warning bg-warning-background text-center text-sm">{reservation.status}</td>}
              <td className="py-2 text-white text-center">
               
                <button type="button" onClick={() => deleteHandler(reservation)} className="text-sm  bg-warning px-2 py-2 rounded hover:opacity-80 transition-all ease-linear">Delete</button>
               
              </td>
            </tr>))}

          </tbody>
        </table>

      </div>
    </div>









  }
  export default ReservationScreen;