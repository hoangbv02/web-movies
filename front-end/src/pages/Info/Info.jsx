import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Info.scss";
import { PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getMovieById, getMovies } from "../../api/request";
import List from "../../components/List/List";
import moment from "moment";
import Loading from "../../components/Loading/Loading";

const Info = () => {
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var part = 0;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = {
                movies: await getMovies(1, "title", "desc"),
                movie: await getMovieById(id),
            };
            setMovie(res.movie);
            setMovies(res.movies);
            setIsLoading(false);
        };
        fetchData();
    }, [id]);
    return (
        <>
            {isLoading && <Loading />}
            <Navbar />
            <div className="wrapper">
                <div className="info">
                    <img
                        src={
                            movie.medias &&
                            movie.medias.map((item) =>
                                item.mediaType === "image" ? item.mediaPath : ""
                            )
                        }
                        alt=""
                    />
                    <div className="content">
                        <h2>{movie && movie.title}</h2>
                        <p>Mô tả: {movie && movie.description}</p>
                        <div className="sub">
                            <span>Quốc gia: {movie && movie.country}</span>
                            <span>
                                Phát hành:
                                {movie &&
                                    moment
                                        .utc(movie.releaseTime)
                                        .format("MMM Do, YYYY")}
                            </span>
                        </div>
                        {/* <p>Thể loại: {movie.genres&&movie.genres.map(genres)}</p> */}
                        <h3>Chọn tập phim</h3>
                        <div className="parts">
                            {movie.medias &&
                                movie.medias.map((media, i) => {
                                    if (
                                        media.mediaType.includes("video_part")
                                    ) {
                                        part += 1;
                                        return (
                                            <Link
                                                key={i}
                                                to={`/watch-movie?id=${id}&mediaType=${media.mediaType}`}
                                                className="link"
                                            >
                                                <button className="play">
                                                    <span>Tập {part}</span>
                                                </button>
                                            </Link>
                                        );
                                    }
                                })}
                        </div>
                    </div>
                </div>
                <div className="related">
                    <List
                        movies={movies}
                        title="Phim tương tự"
                        autoPlay={true}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Info;
