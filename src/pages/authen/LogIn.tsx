import axios from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../authen/login.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { authenActions } from "../../store/slices/authen.slice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const navigate = useNavigate();

  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function createToken(data: any): string {
    const dataJsonStr = JSON.stringify({ data, privateKey: "NDK" });
    let hashStr = ``;
    for (const i in dataJsonStr) {
      hashStr += dataJsonStr[i].charCodeAt(0) * 3 + "'";
    }
    return hashStr;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.get("http://localhost:3001/authen");

      const user = response.data.find(
        (user: any) => user.email === email && user.password === password
      );

      if (user) {
        (e.target as HTMLFormElement).reset();
        const token = createToken(user);
        localStorage.setItem("token", token);
        dispatch(authenActions.loginSuccess(user));
        setTimeout(() => {
          navigate("/");
        }, 1000);
        toast.success("Đăng nhập thành công");
      } else {
        setEmailError("Email hoặc mật khẩu không đúng");
        toast.error("Đăng nhập thất bại");
      }
    } catch (err) {
      console.log(err);
      setEmailError("Đã xảy ra lỗi khi đăng nhập");
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="formLogIn">
      <ToastContainer />
      <div className="headerLogIn">
        <Link to="/register">
          <ArrowBackIcon />
        </Link>
        <img
          src="https://winmart.vn/_next/static/images/logovin-108bbe45e7de2295fdf97185ea5f93ed.png"
          alt=""
        />
      </div>
      <h1 className="titleLogIn">Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          autoFocus
          id="email"
          label="Email"
          variant="outlined"
          onChange={handleInputEmail}
          placeholder="Email"
          type="email"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
        <p className="error">{emailError}</p>
        <TextField
          inputProps={{ minLength: 6 }}
          required
          id="password"
          label="Mật khẩu"
          variant="outlined"
          onChange={handleInputPassword}
          placeholder="Mật khẩu"
          type="password"
          InputLabelProps={{
            style: { color: "black" },
          }}
          inputProps={{
            minLength: 6,
          }}
        />
        <p className="error">{passwordError}</p>
        <button className="btnLogIn" type="submit">
          Đăng nhập
        </button>
        <div className="login-LinkForgot">
          <Link to="/" className="login-forgotPassword">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="login-textOrHr">
          <span className="login-textor">Hoặc</span>
          <hr />
        </div>
      </form>
      <Link to="/register">
        <button className="login-btnRegister">Đăng ký</button>
      </Link>
    </div>
  );
};

export default Login;
