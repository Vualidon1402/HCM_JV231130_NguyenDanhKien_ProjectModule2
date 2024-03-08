import "./ad.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdComponent() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const onClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="Ad">
      <div className="ad-container">
        <div className="ad-content">
          <img
            onClick={() => navigate("/cart")}
            style={{
              width: "600px",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
              cursor: "pointer",
            }}
            src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/11/29/1121865/BIA.jpg"
            alt="bia"
          />
        </div>
        <div>
          <button className="close-btn" onClick={() => navigate("/cart")}>
            XEM THÊM
          </button>
          <button className="close-btn" onClick={onClose}>
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdComponent;
