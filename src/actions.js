import axios from "axios";
import { toast } from "react-toastify";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  toast("Favorilerden silindi", {
    type: "warning",
    autoClose: 2000,
  });
  return { type: FAV_REMOVE, payload: id };
};

export const fetchAnother = () => (dispatch) => {
  dispatch({ type: FETCH_LOADING });
  axios
    .get("https://www.boredapi.com/api/activity/")
    .then(function (response) {
      console.log(response);
      // handle success
      dispatch({ type: FETCH_SUCCESS, payload: response.data });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      dispatch({ type: FETCH_ERROR, payload: error.message });
    })
    .finally(function () {
      // always executed
    });
};
