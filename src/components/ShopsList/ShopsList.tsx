import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { ShopItem } from "../ShopItem/ShopItem";
import "./ShopsList.css";
import { CSSProperties, useEffect, useState } from "react";
import { getShopList, getToken } from "../../AppSlice";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#7496F2",
};

export const ShopsList = () => {
  const shops = useSelector((state: RootState) => state.app.shops);
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.bearerToken);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#D5DDF2");

  useEffect(() => {
    dispatch(getToken());
    if (token) {
      dispatch(getShopList(token));
    }
  }, [token]);

  const content = shops ? (
    shops.items.map((shop, i) => <ShopItem shop={shop} key={i} />)
  ) : (
    <div className="ShopList__loader">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
      />
    </div>
  );
  return <div className="ShopList">{content}</div>;
};
