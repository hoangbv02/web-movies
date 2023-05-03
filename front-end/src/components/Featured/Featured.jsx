import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Featured.scss";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Featured = ({ movies }) => {
    return (
        <div className="featured">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="container"
            >
                {movies &&
                    movies.map((movie, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={
                                    movie.medias &&
                                    movie.medias.map((item, i) =>
                                        item.mediaType == "image"
                                            ? item.mediaPath
                                            : ""
                                    )
                                }
                                alt={movie.title}
                            />
                            <div className="info ">
                                <span className="title">{movie.title}</span>
                                <span className="desc">
                                    {movie.description}
                                </span>
                                <div className="buttons">
                                    <Link
                                        to={"/info-movie?id=" + movie.id}
                                        className="link"
                                    >
                                        <button className="play">
                                            <PlayArrow />
                                            <span>Play</span>
                                        </button>
                                    </Link>
                                    <Link to="/more" className="link">
                                        <button className="more">
                                            <InfoOutlined />
                                            <span>More</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default Featured;
