import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/authen/Register";
import Login from "../pages/authen/LogIn";
import Admin from "../pages/admin/Admin";
import Cart from "../pages/cart/Cart";

const LoadRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        {<Route path="/cart" element={<Cart />}></Route>}
      </Routes>
    </BrowserRouter>
  );
};

export default LoadRoute;
