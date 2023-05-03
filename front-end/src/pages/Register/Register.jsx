import "./Register.scss";
import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import { useState } from "react";
import { register } from "../../api/request";

const Register = ({}) => {
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({});
    const validate = (name, birth, gender, address, username, password) => {
        const messages = {};
        if (!name) {
            messages.name = "name is required";
        }
        if (!birth) {
            messages.birth = "birth is required";
        }
        if (!gender) {
            messages.gender = "gender is required";
        }
        if (!address) {
            messages.address = "address is required";
        }
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
        const messages = validate(
            name,
            birth,
            gender,
            address,
            username,
            password
        );
        if (Object.keys(messages).length > 0) {
            setErrorMessage(messages);
        } else {
            const data = {
                name: name,
                birth: birth,
                gender: gender,
                address: address,
                username: username,
                password: password,
            };
            const res = await register(data);
            if (!res.error) {
                navigate("/login");
            }
            alert(res.message);
        }
    };

    return (
        <div className="register">
            <div className="top animate__animated animate__fadeInDown">
                <img src={images.logo} alt="logo" />
            </div>
            <div className="container animate__animated animate__zoomIn">
                <form action="" onSubmit={handleSubmit} method="post">
                    <h1>Đăng ký</h1>
                    <div className="form-input">
                        <label htmlFor="name">Tên:</label>
                        <input
                            name="name"
                            id="name"
                            className="input"
                            type="text"
                            placeholder="Nhập tên"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <span className="error-message">{errorMessage.name}</span>
                    <div className="form-input">
                        <label htmlFor="birth">Ngày sinh:</label>
                        <input
                            name="birth"
                            id="birth"
                            className="input"
                            type="date"
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <span className="error-message">{errorMessage.birth}</span>
                    <div className="form-input">
                        <label htmlFor="gender">Giới tính:</label>
                        <div className="input-radio">
                            Nam:
                            <input
                                name="gender"
                                id="gender"
                                type="radio"
                                value="Nam"
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="input-radio">
                            Nữ:
                            <input
                                name="gender"
                                type="radio"
                                onChange={(e) => setGender(e.target.value)}
                                value="Nữ"
                            />
                        </div>
                    </div>
                    <span className="error-message">{errorMessage.gender}</span>
                    <div className="form-input">
                        <label htmlFor="address">Địa chỉ:</label>
                        <textarea
                            name="address"
                            id="address"
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </div>
                    <span className="error-message">
                        {errorMessage.address}
                    </span>
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
                    <button type="submit" className="btn-register link">
                        Đăng ký
                    </button>
                    <span>
                        Bạn đã có tài khoản?{" "}
                        <Link to="/login" className="link bold">
                            Đăng nhập ngay.
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Register;
