import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ShopItem } from "../ShopItem/ShopItem";
import "./ShopsList.css";
import { useEffect } from "react";
// import { loadShopList } from "../../AppSlice";
import { Loader } from "../Loader/Loader";
import { getShopList, getToken } from "../../AppSlice";

export const ShopsList = () => {
  const shops = useSelector((state: RootState) => state.app.shops);
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.bearerToken);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);
  useEffect(() => {
    dispatch(getToken());

    if (token) {
      dispatch(getShopList(token));
    }
  }, [token]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="ShopList">
      {shops && shops.items.map((shop, i) => <ShopItem shop={shop} key={i} />)}
    </div>
  );
};
