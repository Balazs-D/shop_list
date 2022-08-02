import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { ShopsList } from "./components/ShopsList/ShopsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShopDetails } from "./components/ShopDetails/ShopDetails";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover
        closeOnClick
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShopsList />} />
          <Route path="/:id" element={<ShopDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
