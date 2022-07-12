import axios from 'axios';
import { RESERVATION_LIST_REQUEST, RESERVATION_LIST_SUCCESS, RESERVATION_LIST_FAIL, RESERVATION_DELETE_REQUEST, RESERVATION_DELETE_SUCCESS, RESERVATION_DELETE_FAIL} from './type';

const listReservations = () => async (dispatch) => {

    try {
      dispatch({ type: RESERVATION_LIST_REQUEST });
      const { data } = await axios.get("/get_reservation", {
   
      });
      dispatch({ type: RESERVATION_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: RESERVATION_LIST_FAIL, payload: error.message });
    }
  }
  const deleteReservations = (reservationId) => async (dispatch) => {
    try {
      dispatch({ type: RESERVATION_DELETE_REQUEST, payload: reservationId });
      const { data } = await axios.delete("/get_reservation/" + reservationId, {
   
      });
      dispatch({ type: RESERVATION_DELETE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: RESERVATION_DELETE_FAIL, payload: error.message });
    }
  }
  export { listReservations, deleteReservations };