import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountdownTimer from "../../components/time/CountdownTimer";
import { UserDataAction } from "../../store/slices/user.slice";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import AdComponent from "./components/ad/Ad";
import Boottrap from "./components/boottrap/Boottrap";
import "./home.scss";
interface Product {
  id: number;
  discount: number;
  image: string;
  name: string;
  price_before_discount: number;
  price: number;
  viewed: number;
  sold: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const number_of_per_page = 8;
  const [sort, setSort] = useState<string>("-discount");
  const [type, setType] = useState<string>("");
  const dispatch = useDispatch();

  const userStore = useSelector((store: any) => store.UserDataReducer);

  const handleAddToCart = (product_id: number | undefined) => {
    const updatedUserDataCart = userStore.data?.cart.map((cart) => {
      if (cart.product_id == product_id) {
        const updatedQuantity = Number(cart.quantity);
        const updatedTotalPrice = updatedQuantity * cart.price;
        alert("Cập nhật giỏ hàng thành công");
        return {
          ...cart,
          quantity: updatedQuantity,
          total_price: updatedTotalPrice,
        };
      }
      return cart;
    });

    const isNewItem = !updatedUserDataCart?.some(
      (cart) => cart.product_id == product_id
    );

    if (isNewItem) {
      const newItem = {
        id: "" + Math.ceil(Math.random() * Date.now()),
        // name: products?.name,
        // image: products?.image,
        // price: products?.price,
        product_id: product_id,
        quantity: 1,
        // total_price: products?.quantity * products.price,
      };

      updatedUserDataCart?.push(newItem);
      alert("Thêm vào giỏ hàng thành công");

      console.log("updatedUserDataCart", updatedUserDataCart);

      const updateCart = {
        id: userStore.data?.id,
        cart: updatedUserDataCart,
      };

      apiUpdate(updateCart);
      dispatch(UserDataAction.setCart(updatedUserDataCart));
      console.log("update", updatedUserDataCart);

      setTimeout(() => {
        window.location.href = "/";
      }, 700);

      //API Update Cart
    }
  };
  const apiUpdate = async (updateCart: any) => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/authen/${updateCart.id}`,
        updateCart
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/categories?_page=${page}&_per_page=${number_of_per_page}&_sort=${sort}&type=${type}`
        );

        setProducts(res.data.data);

        setTotalItemsCount(res.data.items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [page, sort, type]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="home_page">
      <Header products={products} setProducts={setProducts} setType={setType} />
      <div className="home_page_body">
        <Boottrap />
        <AdComponent onClose={() => {}} />
        <div className="action">
          <button
            className="view"
            onClick={() => {
              setSort((prevSort) => {
                return prevSort === "-viewed" ? "viewed" : "-viewed";
              });
            }}
          >
            {sort === "-viewed" ? "Xem ít nhất" : "Xem nhiều nhất "}
          </button>
          <button
            className="discount"
            onClick={() =>
              setSort((prevSort) => {
                return prevSort === "-discount" ? "discount" : "-discount";
              })
            }
          >
            {sort == "-discount" ? "Giảm giá ít nhất" : "Giảm giá nhiều nhất"}
          </button>
          <button
            className="price"
            onClick={() =>
              setSort((prevSort) => {
                return prevSort === "-price" ? "price" : "-price";
              })
            }
          >
            {sort == "-price" ? "Giá thấp nhất" : "Giá cao nhất"}
          </button>
          <button
            className="sold"
            onClick={() =>
              setSort((prevSort) => {
                return prevSort == "-sold" ? "sold" : "-sold";
              })
            }
          >
            {sort === "-sold" ? "Đã bán ít nhất" : "Đã bán nhiều nhất"}
          </button>
        </div>
        <div className="time_container">
          <div className="timer">
            <h1>Siêu khuyến mãi</h1>
            <CountdownTimer hours={10} minutes={0} seconds={0} />
          </div>
        </div>

        <div className="listProduct">
          {products?.map((product: Product) => (
            <div className="product" key={product.id}>
              <div className="product-Discount">-{product.discount}%</div>
              <img
                style={{ width: 250 }}
                src={product.image}
                alt="{product.image}"
              />
              <p className="product-Name">{product.name}</p>
              <div className="product-price-view">
                <p className="product-price">
                  <span className="product-OldPrice">
                    {product.price_before_discount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>{" "}
                  <span className="product-NewPrice">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
                <div className="product-view-sold">
                  <p className="product-View">
                    <RemoveRedEyeIcon /> {product.viewed}
                  </p>
                  <p className="product-sold">
                    <span>Đã bán: </span>
                    {product.sold}
                  </p>
                </div>
              </div>
              <button
                className="product-btn"
                onClick={() => handleAddToCart(product.id)}
              >
                <AddShoppingCartIcon /> Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        id="pagination"
        count={Math.ceil(totalItemsCount / number_of_per_page)}
        page={page}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        variant="outlined"
      />
      <Footer></Footer>
    </div>
  );
};

export default Home;
