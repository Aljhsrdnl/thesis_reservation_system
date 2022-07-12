import {
    RESERVATION_LIST_REQUEST, RESERVATION_LIST_SUCCESS, RESERVATION_LIST_FAIL, RESERVATION_DELETE_REQUEST, RESERVATION_DELETE_SUCCESS, RESERVATION_DELETE_FAIL
  } from "../actions/type";
  
  
  
  
  // function reservationDetailsReducer(state = {
  //   reservation: {
  //     reservationItems: [],
  //     shipping: {},
  //     payment: {}
  //   }
  // }, action) {
  //   switch (action.type) {
  //     case RESERVATION_DETAILS_REQUEST:
  //       return { loading: true };
  //     case RESERVATION_DETAILS_SUCCESS:
  //       return { loading: false, reservation: action.payload };
  //     case RESERVATION_DETAILS_FAIL:
  //       return { loading: false, error: action.payload };
  //     default: return state;
  //   }
  // }
  
  
  // function myReservationvationListReducer(state = {
  //   reservations: []
  // }, action) {
  //   switch (action.type) {
  //     case MY_RESERVATION_LIST_REQUEST:
  //       return { loading: true };
  //     case MY_RESERVATION_LIST_SUCCESS:
  //       return { loading: false, reservations: action.payload };
  //     case MY_RESERVATION_LIST_FAIL:
  //       return { loading: false, error: action.payload };
  //     default: return state;
  //   }
  // }
  
  function reservationListReducer(state = {
    reservations: []
  }, action) {
    switch (action.type) {
      case RESERVATION_LIST_REQUEST:
        return { loading: true };
      case RESERVATION_LIST_SUCCESS:
        return { loading: false, reservations: action.payload };
      case RESERVATION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  
  function reservationDeleteReducer(state = {
    reservation: {
      reservationItems: [],
      shipping: {},
      payment: {}
    }
  }, action) {
    switch (action.type) {
      case RESERVATION_DELETE_REQUEST:
        return { loading: true };
      case RESERVATION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case RESERVATION_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  export {
    reservationListReducer, reservationDeleteReducer
  }