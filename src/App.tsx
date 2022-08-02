import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppDispatch, RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { getShopList, getToken } from "./AppSlice";
import { ShopsList } from "./components/ShopsList/ShopsList";

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.bearerToken);

  useEffect(() => {
    dispatch(getToken());
    if (token) {
      dispatch(getShopList(token));
    }
  }, [token]);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover
        closeOnClick
      />
      <ShopsList />
    </div>
  );
};
