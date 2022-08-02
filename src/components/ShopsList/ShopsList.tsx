import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ShopsList = () => {
  const shops = useSelector((state: RootState) => state.app.shops);

  const content = shops ? (
    shops.items.map((shop, i) => (
      <div key={i}>
        <div>{shop.name}</div>
        <div>{shop.id}</div>
      </div>
    ))
  ) : (
    <div>Shop are not loaded yet...</div>
  );
  return <div className="ShopList">{content}</div>;
};
