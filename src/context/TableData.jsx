import { createContext, useEffect, useReducer } from "react";
import { SET_DATA, SET_LOADING, SET_SEARCH } from "./action";
import api from "../api/api";
import { toast } from "react-toastify";

const initialState = {
  result: {},
  formResult: {},
  strengthResult: {},
  packingResult: {},
  search: "",
  loading: false,
  data:[]
};
//

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case SET_DATA: {
      return { ...state, data: action.payload };
    }
    case SET_SEARCH: {
      return { ...state, search: action.payload };
    }
    default:
      return state;
  }
};
export const TableDataContext = createContext(initialState);

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    console.log(state.search)
    if(!state.search){
      toast.error("please type your desired salt", {
        position: "top-right", // Change the position of the toast
        autoClose: 500, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: true, // Hide the progress bar
      });
      console.log(state.search)
      return
    }
    dispatch({ type: SET_LOADING, payload: true });
    try {
      let data = await api.get(
        `?q=${state.search}&pharmacyIds=1,2,3`
      );
      console.log(data)
      dispatch({ type: SET_DATA, payload: data.data.data.saltSuggestions});
    } catch (err) {
      console.log(err);
      toast.error(err.message||"No salt found", {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 500, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: true, // Hide the progress bar
      });
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

  const value = {
    state,
    dispatch,
    getData,
  };
  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  );
};
