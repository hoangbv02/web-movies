import { useEffect, useState } from "react";
import "./Home.scss";
import List from "../../components/List/List";
import Featured from "../../components/Featured/Featured";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getMovieByGenres, getMovies } from "../../api/request";
import Loading from "../../components/Loading/Loading";

const Home = () => {
    const [moviesFeature, setMoviesFeature] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [horrifiedMovies, setHorrifiedMovies] = useState([]);
    const [emotionalMovies, setEmotionalMovies] = useState([]);
    const [cartoonMovies, setCartoonMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setIsLoading(true);
            const res = {
                newMovies: await getMovies(1, "create_at", "desc", 10),
                actionMovies: await getMovieByGenres(1),
                horrifiedMovies: await getMovieByGenres(2),
                emotionalMovies: await getMovieByGenres(3),
                cartoonMovies: await getMovieByGenres(4),
            };
            if (mounted) {
                setMoviesFeature(res.newMovies);
                setNewMovies(res.newMovies);
                setActionMovies(res.actionMovies);
                setHorrifiedMovies(res.horrifiedMovies);
                setEmotionalMovies(res.emotionalMovies);
                setCartoonMovies(res.cartoonMovies);
                setIsLoading(false);
            }
        };
        fetchData();
        return () => (mounted = false);
    }, []);
    return (
        <>
            {isLoading && <Loading />}
            <div className="home">
                <Navbar />
                <Featured movies={moviesFeature} />
                <List movies={newMovies} title="Phim mới cập nhật" />
                <List movies={actionMovies} title="Phim hành động" />
                <List movies={horrifiedMovies} title="Phim kinh dị" />
                <List movies={emotionalMovies} title="Phim tình cảm" />
                <List movies={cartoonMovies} title="Phim hoạt hình" />
                <Footer />
            </div>
        </>
    );
};

export default Home;
