import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Cart = () => {
  // const cart = useSelector((state: RootState) => state.authen.cart);

  return (
    <div>
      <Header />
      <div className="Cart_body">
        {/* {cart.map((product, index) => (
          <div key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))} */}
        cart
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
