import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store/store";
import { Dispatch } from "react";
import { ShopType } from "./types";
import { toast } from "react-toastify";

const X_API_KEY = "lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF";

const urlToken = "https://testapi.mehrwerk.de/v2/iam/oauth/token";
const baseUrlShops = "https://testapi.mehrwerk.de/v3/cashback/shops";

export type ShopsData = {
  currentPage: number;
  numberOfPages: number;
  numberOfResults: number;
  items: ShopType[];
};

export interface AppState {
  isLoading: boolean;
  bearerToken: string | null;
  shops: ShopsData | null;
}

const initialState: AppState = {
  isLoading: false,
  bearerToken: null,
  shops: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state: AppState, action: PayloadAction<string>) => {
      state.bearerToken = action.payload;
    },
    setShopsData: (state: AppState, action: PayloadAction<ShopsData>) => {
      state.shops = action.payload;
    },
  },
});

export const { setToken, setShopsData } = appSlice.actions;

export const getToken = () => async (dispatch: AppDispatch) => {
  const data = {
    client_id: "bewerber",
    client_secret: "hj52Ws4kF",
    grant_type: "client_credentials",
  };

  try {
    const res = await axios.post(urlToken, data, {
      headers: {
        "Content-type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    });
    dispatch(setToken(res.data.access_token));
    // console.log(res);
  } catch {
    toast.error("Token could not be loaded...");
  }
};

export const getShopList =
  (token: string) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await axios.get(baseUrlShops, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": X_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setShopsData(res.data));
    } catch {
      toast.error("Shops could not be loaded...");
    }
  };
