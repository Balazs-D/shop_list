import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store/store";
import { Dispatch } from "react";
import { ShopType } from "./types";
import { toast } from "react-toastify";

export const X_API_KEY = "lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF";

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
  shops: ShopsData;
  shop: ShopType | null;
}

const initialState: AppState = {
  isLoading: false,
  shops: {
    currentPage: 1,
    numberOfPages: 1,
    numberOfResults: 0,
    items: [],
  },
  shop: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShopsData: (state: AppState, action: PayloadAction<ShopsData>) => {
      state.shops = action.payload;
    },
    resetShop: (state: AppState) => {
      state.shop = null;
    },
    setShop: (state: AppState, action: PayloadAction<ShopType>) => {
      state.shop = action.payload;
    },
    setLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setShopsData, resetShop, setShop, setLoading } =
  appSlice.actions;

export const getToken = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

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
    // dispatch(setToken(res.data.access_token));

    localStorage.setItem("token", res.data.access_token);
  } catch (err) {
    toast.error("Authorization Fehler...");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getShopList = () => async (dispatch: Dispatch<any>) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(baseUrlShops, {
      headers: {
        "Content-type": "application/json",
        "X-API-KEY": X_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setShopsData(res.data));
  } catch (err) {
    dispatch(setShopsData(initialState.shops));

    toast.error("Shops konnten nicht geladen werden...");
  } finally {
    dispatch(setLoading(false));
  }
};

export const getShopDetails =
  (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(baseUrlShops + "/" + id, {
        headers: {
          "Content-type": "application/json",
          "X-API-KEY": X_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setShop(res.data));
    } catch (err) {
      toast.error("Shop Details konnten nicht geladen werden...");
    } finally {
      dispatch(setLoading(false));
    }
  };
