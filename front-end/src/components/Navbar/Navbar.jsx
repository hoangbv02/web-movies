import "./Navbar.scss";
import "animate.css";
import { useEffect, useState, useRef } from "react";
import {
    ArrowDropDown,
    ArrowRight,
    Notifications,
    PlayArrow,
    Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import { getGenres } from "../../api/request";

const Navbar = ({ type }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [genres, setGenres] = useState([]);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const leftE = useRef();

    const handleClick = (e) => {
        var key = e.target.previousElementSibling.value;
        setValue(key);
        console.log(value);
        // const searchInput = e.target.previousElementSibling.value;
        navigate("/search?q=" + value);
    };
    const handleChange = (e) => {
        if (e.key === "Enter") {
            navigate("/search?q=" + e.target.value);
        }
    };
    // window.addEventListener("keydown", (e) => {
    //
    // });
    const handleLogout = () => {
        localStorage.setItem("access_token", "");
    };

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            const genres = await getGenres();
            if (mounted) setGenres(genres);
        };
        const handleScroll = () => {
            if (window.pageYOffset === 0) {
                if (mounted) setIsScrolled(false);
            } else {
                if (mounted) setIsScrolled(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        fetchData();
        return () => {
            mounted = false;
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left" ref={leftE}>
                    <Link to="/">
                        <img src={images.logo} alt="logo" />
                    </Link>
                    <Link to="/" className={!type ? "link active" : "link"}>
                        <span>Trang chủ</span>
                    </Link>
                    <Link
                        to="/odd-movie"
                        className={type == "odd-movie" ? "link active" : "link"}
                    >
                        <span>Phim lẻ</span>
                    </Link>
                    <Link
                        to="/series-movie"
                        className={
                            type == "series-movie" ? "link active" : "link"
                        }
                    >
                        <span>Phim bộ</span>
                    </Link>
                    <div className="genres">
                        <Link to="#" className="link">
                            <span className="navbarmainLinks">
                                Thể loại <ArrowDropDown />
                            </span>
                        </Link>
                        <ul>
                            {genres &&
                                genres.map((item, i) => (
                                    <li key={i}>
                                        <ArrowRight />
                                        <Link to={"/genres?id=" + item.id}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search"
                            // value={value}
                            className="form-input"
                            onKeyDown={handleChange}
                        />
                        <Search className="icon" onClick={handleClick} />
                    </div>
                    {/* <span className="kid">KID</span> */}
                    <Notifications className="icon" />
                    <img src={images.avatar} alt="avatar" />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to="/settings" className="link">
                                <span>Settings</span>
                            </Link>
                            <Link
                                to="/login"
                                onClick={handleLogout}
                                className="link"
                            >
                                <span className="logout">Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
