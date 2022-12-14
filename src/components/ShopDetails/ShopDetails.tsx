import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getShopDetails, resetShop } from "../../AppSlice";
import { truncateText } from "../../utils/truncate";
import "./ShopDetails.css";
import IMG_PLACEHOLDER from "../../assets/logo_ph.png";
import { Loader } from "../Loader/Loader";

export const ShopDetails = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const shop = useSelector((state: RootState) => state.app.shop);
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  const [isImgBroken, setIsImgBroken] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getShopDetails(id));
    }

    return () => {
      dispatch(resetShop());
    };
  }, [id]);

  if (isLoading || !id || !shop) {
    return <Loader />;
  }

  const image = isImgBroken ? IMG_PLACEHOLDER : shop.logo;

  return (
    <div className="Details">
      <div className="Details_image_cont">
        <img
          alt={shop.name + "_logo"}
          src={image}
          onError={() => setIsImgBroken(true)}
        />
      </div>

      <div className="Details__block Details_desc">
        {truncateText(shop.description)}
      </div>
      {shop.cashbackRates.length !== 0 && (
        <div className="Details__block">
          <div className="Details__block_label">Cashback rates:</div>
          {shop.cashbackRates.map((item, i) => (
            <div key={i}>
              {item.description}: {item.amount}
              {item.type}
            </div>
          ))}
        </div>
      )}

      <div className="Details__block">
        <div className="Details__block_label">Categories:</div>
        {shop.categories.map((cat, i) => (
          <div key={i}>{cat.name}</div>
        ))}
      </div>
      <div className="Details__actions">
        <button onClick={() => navigate(-1)}>Back to list</button>
      </div>
    </div>
  );
};
