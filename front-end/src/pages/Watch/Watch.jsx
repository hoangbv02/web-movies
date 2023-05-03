import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Watch.scss";
import { useEffect, useState } from "react";
import { getMovieById, getMovies } from "../../api/request";
import List from "../../components/List/List";
import { PlayArrow } from "@mui/icons-material";
import Loading from "../../components/Loading/Loading";
const Watch = () => {
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    const mediaType = query.get("mediaType");
    var part = 0;
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = {
                movies: await getMovies(1, "title", "asc"),
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
            <div className="main">
                {movie.medias &&
                    movie.medias.map((item, i) => {
                        if (item.mediaType === mediaType) {
                            return (
                                <video
                                    key={i}
                                    src={item.mediaPath}
                                    controls
                                ></video>
                            );
                        }
                    })}

                <h2>{movie && movie.title}</h2>
                <p>Mô tả: {movie && movie.description}</p>
                <h3>Chọn tập phim</h3>
                <div className="parts">
                    {movie.medias &&
                        movie.medias.map((media, i) => {
                            if (media.mediaType.includes("video_part")) {
                                part += 1;
                                return (
                                    <Link
                                        key={i}
                                        to={`/watch-movie?id=${id}&mediaType=${media.mediaType}`}
                                        className="link"
                                    >
                                        <button
                                            className={
                                                mediaType == media.mediaType
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <PlayArrow />
                                            <span>Tập {part}</span>
                                        </button>
                                    </Link>
                                );
                            }
                        })}
                </div>
            </div>
            <div className="related">
                <List movies={movies} title="Phim tương tự" autoPlay={true} />
            </div>
            <Footer />
        </>
    );
};
export default Watch;
