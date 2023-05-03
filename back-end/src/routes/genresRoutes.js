const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");
const { isAuth } = require("../common/middlewareLogin");
router.get("/genres", isAuth, genresController.getGenres);
router.get("/genres/:id", isAuth, genresController.getGenresById);
router.post("/genres", genresController.addGenres);
router.put("/genres/:id", genresController.updateGenres);
router.delete("/genres/:id", genresController.deleteGenres);
module.exports = {
    routes: router,
};
