import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store/store";

export interface AppState {
  isLoading: boolean;
  bearerToken: string | null;
}

const initialState: AppState = {
  isLoading: false,
  bearerToken: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state: AppState, action: PayloadAction<string>) => {
      state.bearerToken = action.payload;
    },
  },
});

export const { setToken } = appSlice.actions;

const urlToken = "https://testapi.mehrwerk.de/v2/iam/oauth/token";

export const getToken = () => async (dispatch: AppDispatch) => {
  const config = {
    headers: {
      "X-API-KEY": "lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF",
    },
  };

  const data = {
    client_id: "bewerber",
    client_secret: "hj52Ws4kF",
    grant_type: "client_credentials",
  };

  try {
    const res = await axios.post(urlToken, data, {
      headers: config.headers,
    });
    dispatch(setToken(res.data.access_token));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
