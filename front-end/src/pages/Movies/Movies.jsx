import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Movies.scss";
import {
    getMovieByGenres,
    getMovies,
    getOddMovie,
    getSeriesMovie,
} from "../../api/request";
import ListItem from "../../components/ListItem/ListItem";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Movies = ({
    title,
    isOddMovie = false,
    isSeriesMovie = false,
    isSearchMovie = false,
}) => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchParams = query.get("q");
    const genresId = query.get("id");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            var movies = [];
            if (isOddMovie) {
                setIsLoading(true);
                movies = await getOddMovie();
            } else if (isSeriesMovie) {
                setIsLoading(true);
                movies = await getSeriesMovie();
            } else if (isSearchMovie) {
                setIsLoading(true);
                movies = await getMovies(1, "title", "asc", 20, searchParams);
            } else if (genresId) {
                setIsLoading(true);
                movies = await getMovieByGenres(genresId);
            }
            
            setMovies(movies);
            setIsLoading(false);
        };
        fetchData();
    }, [searchParams, title, genresId]);
    return (
        <>
            {isLoading && <Loading />}

            <Navbar
                type={
                    (isOddMovie && "odd-movie") ||
                    (isSeriesMovie && "series-movie")
                }
            />
            <div className="main">
                <h2>
                    {title} {searchParams && ": " + searchParams}
                </h2>
                <div className="list">
                    {movies &&
                        movies.map((movie, i) => {
                            return (
                                <div className="item" key={i}>
                                    <ListItem index={i} movie={movie} />
                                </div>
                            );
                        })}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Movies;
