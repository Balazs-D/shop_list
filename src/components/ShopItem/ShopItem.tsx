import { FC, useState } from "react";
import "./ShopItem.css";
import { ShopType } from "../../types";
import IMG_PLACEHOLDER from "../../assets/logo_ph.png";
import { mdiCardsHeartOutline, mdiCardsHeart } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

interface Props {
  shop: ShopType;
}

export const ShopItem: FC<Props> = (props) => {
  const [isImgBroken, setIsImgBroken] = useState<boolean>(false);
  const navigate = useNavigate();
  const image = isImgBroken ? IMG_PLACEHOLDER : props.shop.logo;
  return (
    <div className="ShopItem">
      <div className="ShopItem__logo_cont">
        <img
          className="ShopItem__logo"
          alt={props.shop.name + "_logo"}
          src={image}
          onError={() => setIsImgBroken(true)}
        />
      </div>

      <div className="ShopItem__details">
        <div className="ShopItem__details_title">{props.shop.name}</div>
        <div className="ShopItem__details_fav">
          {/*{JSON.stringify(props.shop.isFavorite)}*/}
          {props.shop.isFavorite ? (
            <Icon path={mdiCardsHeart} size="1.2rem" color="#3CA6A6" />
          ) : (
            <Icon path={mdiCardsHeartOutline} size="1.2rem" color="#3CA6A6" />
          )}
        </div>
      </div>
      <div className="ShopItem__actions">
        <button
          onClick={() => navigate("/" + props.shop.id)}
          className="ShopItem__actions_button "
        >
          See details
        </button>
      </div>
    </div>
  );
};
