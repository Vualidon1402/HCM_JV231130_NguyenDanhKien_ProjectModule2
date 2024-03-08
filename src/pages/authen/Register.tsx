import React, { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "../authen/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

const Register = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const navigate = useNavigate();

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleInputCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      code: code,
      cart: [],
    };

    try {
      const users = await axios.get("http://localhost:3001/authen");

      const emailExists = users.data.some((user: any) => user.email === email);

      if (emailExists) {
        setEmailError("Email đã tồn tại");
        setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
        toast.error("Đăng ký thất bại");
        return;
      }

      await axios.post("http://localhost:3001/authen", data);
      console.log("Đăng ký thành công");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      toast.success("Đăng ký thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setEmailError(err.response?.data?.data?.email || "");
        setPasswordError(err.response?.data?.data?.password || "");
      }
      console.log(err);
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <div className="formRegister">
      <ToastContainer />
      <div className="headerRegister">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <img
          src="https://winmart.vn/_next/static/images/logovin-108bbe45e7de2295fdf97185ea5f93ed.png"
          alt=""
        />
        <Link to="/">
          <HomeIcon />
        </Link>
      </div>
      <h1 className="titleRegister">Đăng ký hội viên</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          id="username"
          label="Họ và tên"
          variant="outlined"
          onChange={handleInputName}
          type="text"
          placeholder="Họ và tên"
          InputLabelProps={{
            style: { color: "black" },
          }}
          style={{ marginBottom: "20px" }}
        />

        <TextField
          required
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
          onChange={handleInputPassword}
          label="Mật khẩu"
          variant="outlined"
          placeholder="Mật khẩu"
          type="password"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
        <p className="error">{passwordError}</p>
        <TextField
          id="code"
          label="Mã giới thiệu"
          variant="outlined"
          onChange={handleInputCode}
          placeholder="Mã giới thiệu"
          type="text"
          InputLabelProps={{
            style: { color: "black" },
          }}
        />

        <div className="register-tc">
          <span>Bằng việc chọn vào Tiếp Tục; bạn đồng ý với</span>
          <Link to="/" className="register-linkTc">
            các điều kiện áp dụng
          </Link>
          <span>của winmart.vn và trở thành Hội viên Win.</span>
        </div>
        <button className="btnRegister" type="submit">
          TIẾP TỤC
        </button>
        <div className="register-textOrHr">
          <p className="register-textor">Hoặc</p>
          <hr />
        </div>
        <Link to="/login">
          <button className="register-btnLogin">ĐĂNG NHẬP</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
