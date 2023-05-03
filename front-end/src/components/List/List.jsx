import ListItem from "../ListItem/ListItem";
import "./List.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const List = ({ movies, title, autoPlay = false }) => {
    return (
        <div className="list">
            <span className="listTitle">{title}</span>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={5}
                autoplay={
                    autoPlay
                        ? {
                              delay: 3000,
                              disableOnInteraction: false,
                          }
                        : false
                }
                navigation
                pagination={{ clickable: true }}
                className="container"
            >
                {movies &&
                    movies.map((movie, i) => (
                        <SwiperSlide key={i}>
                            <ListItem index={i} movie={movie} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default List;
