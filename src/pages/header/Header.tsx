import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { productAction } from "../../store/slices/product.slice";
import "./header.scss";
import { Snowfall } from "react-snowfall";
import { UserDataAction } from "../../store/slices/user.slice";
const Header = (props: any) => {
  const { setProducts, setType } = props;
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") ?? ""
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    axios.post("http://localhost:3001/authen", null, {
      headers: {
        Authorization: ` ${token}`,
      },
    });
    toast.success("Đăng xuất thành công");
  };

  //handleSearch
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;

      try {
        const res = await axios.get(
          `http://localhost:3001/categories?type=${value}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log("error", error);
      }
      dispatch(productAction.setSearchValue(value));
    }
  };

  const handleSort = () => {
    setType((document.getElementById("allOption") as HTMLSelectElement).value);
  };

  //decode token
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token") as string;
      const decodedToken = decodeToken(token);

      const fetchUser = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3001/authen?email=${decodedToken.data.email}`
          );

          dispatch(UserDataAction.setData(res.data[0]));
          setUser(res.data[0]);
          console.log(res.data[0]);
          // console.log(user.cart);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchUser();

      if (decodedToken) {
        setToken(token);
      }
    }
  }, []);
  function decodeToken(token: string): any {
    let baseStr = ``;
    for (const i in token.split("'")) {
      if (token.split("'")[i] == "") break;

      baseStr += String.fromCharCode(parseInt(token.split("'")[i]) / 3);
    }
    try {
      return JSON.parse(baseStr);
    } catch (err) {
      return false;
    }
  }

  return (
    <header>
      <Snowfall />
      <div className="header-container">
        <div className="header-above">
          <div className="header-above-left">
            <Link to="/">
              <img
                src="https://winmart.vn/_next/static/images/logo-d4438e0bbf0ee4be0ab667eb391c2bad.png"
                alt=""
              />
            </Link>
            <div className="header-above-search">
              <button>
                <SearchIcon className="header-above-search-icon" />
              </button>
              <input
                type="text"
                placeholder="FreeShip 30k tất cả sản phẩm"
                onKeyDown={handleSearch}
              />
            </div>
          </div>
          <div className="header-above-right">
            <div className="header-above-right-address">
              <LocationOnIcon className="header-above-right-address-icon" />
              <button>Giao hàng</button>
            </div>

            <Link to="/cart" className="header-above-right-cart">
              {" "}
              <AddShoppingCartIcon className="header-above-right-cart-icon" />
              <span>Giỏ hàng {user?.cart.length}</span>
            </Link>
            <div className="header-above-right-authen">
              {token ? (
                <div className="authenContainer">
                  <div className="authenInfo">
                    Chào bạn, <br />
                    {
                      decodeToken(localStorage.getItem("token") || "").data
                        .email
                    }
                  </div>
                  <div className="dropDownAuthen">
                    <div className="authenItem">Thông tin cá nhân</div>
                    <div className="authenItem">Đơn hàng của tôi</div>
                    <div className="authenItem" onClick={handleLogout}>
                      Đăng xuất
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="header-authen">
                    <AccountCircleIcon className="header-authen-icon" />{" "}
                    <span className="header-authen-text">Hội viên</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="header-under">
          <div className="header-under-left">
            <div className="header-under-left-dropdown">
              <select
                name="Tất cả danh mục"
                id="allOption"
                onChange={handleSort}
              >
                <option value="">Danh mục sản phẩm</option>
                <option value="beer">Đồ uống có cồn</option>
                <option value="milk">Các loại sữa</option>
                <option value="food">Các loại đồ ăn</option>
                <option value="soda">Các loại nước ngọt</option>
                <option value="electric Appliances">Đồ điện gia dụng</option>
              </select>
            </div>
          </div>
          <div className="header-under-right">
            <div className="header-under-right-contact">
              <MailOutlineIcon className="header-under-right-contact-icon" />
              <span>Tin tức WinMart</span>
            </div>
            <div className="header-under-right-help">
              <HeadphonesIcon className="header-under-right-help-icon" />
              <span>Tư vấn mua hàng</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
