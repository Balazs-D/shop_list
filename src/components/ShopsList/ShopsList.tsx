import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ShopItem } from "../ShopItem/ShopItem";
import "./ShopsList.css";
import { useEffect } from "react";
import { getShopList, getToken } from "../../AppSlice";

export const ShopsList = () => {
  const shops = useSelector((state: RootState) => state.app.shops);
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.bearerToken);

  useEffect(() => {
    dispatch(getToken());
    if (token) {
      dispatch(getShopList(token));
    }
  }, [token]);

  const content = shops ? (
    shops.items.map((shop, i) => <ShopItem shop={shop} key={i} />)
  ) : (
    <div>Shop are not loaded yet...</div>
  );
  return <div className="ShopList">{content}</div>;
};
