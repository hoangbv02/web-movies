import "./Login.scss";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import { login } from "../../api/request";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({});

    const validate = (username, password) => {
        const messages = {};
        if (!username) {
            messages.username = "username is required";
        }
        if (!password) {
            messages.password = "password is required";
        }
        return messages;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const messages = validate(username, password);
        if (Object.keys(messages).length > 0) {
            setErrorMessage(messages);
        } else {
            const data = {
                username: username,
                password: password,
            };
            const res = await login(data);
            if (!res.error) {
                localStorage.setItem('access_token',res.data.accessToken)
                navigate("/");
            }
            alert(res.message);
        }
    };
    return (
        <div className="login">
            <div className="top animate__animated animate__fadeInDown">
                <img src={images.logo} alt="logo" />
            </div>
            <div className="container animate__animated animate__zoomIn">
                <form method="post">
                    <h1>Đăng nhập</h1>
                    <div className="form-input">
                        <label htmlFor="username">Tên tài khoản:</label>
                        <input
                            name="username"
                            id="username"
                            className="input"
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <span className="error-message">
                        {errorMessage.username}
                    </span>

                    <div className="form-input">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            name="password"
                            id="password"
                            className="input"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <span className="error-message">
                        {errorMessage.password}
                    </span>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="loginButton link"
                    >
                        Đăng nhập
                    </button>
                    <span>
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register" className="link bold">
                            Đăng ký ngay.
                        </Link>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
