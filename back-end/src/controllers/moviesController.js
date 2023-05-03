const movieService = require("../services/moviesService");
const getMovies = async (req, res, next) => {
    try {
        const seriesMovies = req.query.seriesMovies;
        const movies = await movieService.getMovies(!!seriesMovies);
        res.send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMovieByGenres = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movies = await movieService.getMovieByGenres(id);
        res.send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAll = async (req, res, next) => {
    try {
        const movies = await movieService.getAll();
        res.send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getMovieById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movies = await movieService.getMovieById(id);
        res.send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getMovieByPaging = async (req, res, next) => {
    try {
        const pageIndex = req.query.pageIndex;
        const searchParams = req.query.searchParams;
        const sortParams = req.query.sortParams;
        const sortTypeParams = req.query.sortTypeParams;
        const pageSize = req.query.pageSize;
        const movies = await movieService.getMovieByPaging(
            pageIndex,
            searchParams,
            sortParams,
            sortTypeParams,
            pageSize
        );
        res.send(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const addMovie = async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.files;
        const movie = await movieService.addMovie(data, file);
        res.send(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    getAll,
    addMovie,
    getMovieById,
    getMovieByPaging,
    getMovies,
    getMovieByGenres,
};
