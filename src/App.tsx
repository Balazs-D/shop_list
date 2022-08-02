import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppDispatch } from "./store/store";
import { useDispatch } from "react-redux";
import { getToken } from "./AppSlice";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover
        closeOnClick
      />
    </div>
  );
};
