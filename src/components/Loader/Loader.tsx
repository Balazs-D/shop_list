import { ClipLoader } from "react-spinners";
import { CSSProperties } from "react";
import "./Loader.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#7496F2",
};

export const Loader = () => {
  return (
    <div className="Loader">
      <ClipLoader
        color="#D5DDF2"
        loading={true}
        cssOverride={override}
        size={150}
      />
    </div>
  );
};
