const genresService = require("../services/genresService");
const getGenres = async (req, res, next) => {
    try {
        const genres = await genresService.getGenres();
        res.send(genres);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getGenresById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const genre = await genresService.getGenresById(id);
        res.send(genre);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const addGenres = async (req, res, next) => {
    try {
        const data = req.body;
        const added = await genresService.addGenres(data);
        res.send(added);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const updateGenres = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updated = await genresService.updateGenres(data, id);
        res.send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteGenres = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await genresService.deleteGenres(id);
        res.send(deleted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    getGenres,
    getGenresById,
    addGenres,
    updateGenres,
    deleteGenres,
};
