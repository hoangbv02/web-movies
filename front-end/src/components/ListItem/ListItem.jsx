import { useState } from "react";
import "animate.css";
import {
    Add,
    PlayArrow,
    ThumbDownAltOutlined,
    ThumbUpAltOutlined,
} from "@mui/icons-material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./ListItem.scss";
import { Link } from "react-router-dom";

const ListItem = ({ index, movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);
    return (
        <div
            className="listItem"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isHovered ? (
                movie.medias &&
                movie.medias.map((item, i) => {
                    if (item.mediaType == "image_logo") {
                        return (
                            <img
                                key={i}
                                src={item.mediaPath}
                                alt="img"
                                className="imgItem"
                            />
                        );
                    }
                })
            ) : (
                <>
                    <Link to={"/info-movie?id=" + movie.id}>
                        <img
                            src={
                                movie.medias &&
                                movie.medias.map((item, i) =>
                                    item.mediaType == "image"
                                        ? item.mediaPath
                                        : ""
                                )
                            }
                            alt="img"
                            className="imgItemSub animate__animated animate__slideInDown"
                        />
                    </Link>
                    <div className="itemInfo">
                        <div className="icons animate__animated animate__slideInUp">
                            <Link to={"/info-movie?id=" + movie.id}>
                                <PlayArrow className="icon" />
                            </Link>

                            {like ? (
                                <ThumbUpRoundedIcon
                                    className="icon red"
                                    onClick={() => setLike(false)}
                                />
                            ) : (
                                <ThumbUpAltOutlined
                                    className="icon"
                                    onClick={() => setLike(true)}
                                />
                            )}
                            {disLike ? (
                                <ThumbDownAltIcon
                                    className="icon red"
                                    onClick={() => setDisLike(false)}
                                />
                            ) : (
                                <ThumbDownAltOutlined
                                    className="icon"
                                    onClick={() => setDisLike(true)}
                                />
                            )}
                        </div>
                        <div className="itemInfoTop animate__animated animate__slideInRight">
                            <div className="title animate__animated animate__slideInRight">
                                {movie.title}
                            </div>
                            <span className="view"></span>
                            <span>{movie.releaseTime}</span>
                            <span className="country">{movie.country}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListItem;
