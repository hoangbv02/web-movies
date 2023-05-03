const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const { isAuth } = require("../common/middlewareLogin");
router.get("/movies", isAuth, moviesController.getAll);
router.get("/moviesPaging", isAuth, moviesController.getMovieByPaging);
router.get("/movies/movieType", isAuth, moviesController.getMovies);
router.get("/movies/genres/:id", isAuth, moviesController.getMovieByGenres);
router.get("/movies/:id", isAuth, moviesController.getMovieById);
router.post("/movies", moviesController.addMovie);
module.exports = {
    routes: router,
};
