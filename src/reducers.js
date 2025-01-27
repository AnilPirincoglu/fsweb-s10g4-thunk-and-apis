import { toast } from "react-toastify";
import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if (!state.favs.includes(action.payload)) {
        toast("Favorilere eklendi", {
          type: "success",
          autoClose: 2000,
        });
        const newState = { ...state, favs: [...state.favs, action.payload] };
        writeFavsToLocalStorage(newState);
        return newState;
      }
      return state;

    case FAV_REMOVE:
      const newState = {
        ...state,
        favs: state.favs.filter((item) => item.key !== action.payload),
      };
      writeFavsToLocalStorage(newState);
      return newState;

    case FETCH_SUCCESS:
      return { ...state, current: action.payload, loading: false, error: null };

    case FETCH_LOADING:
      return { ...state, loading: true, error: null, current: null };

    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() || [] };

    default:
      return state;
  }
}
