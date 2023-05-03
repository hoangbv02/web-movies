const usersService = require("../services/usersService");
const getAll = async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const login = async (req, res, next) => {
    try {
        const data = req.body
        const users = await usersService.login(data);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const users = await usersService.getUsersById(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const addUsers = async (req, res, next) => {
    try {
        const data = req.body;
        const added = await usersService.addUsers(data);
        res.status(200).send(added);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const updateUsers = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updated = await usersService.updateUsers(id, data);
        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const deleteUsers = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await usersService.deleteUsers(id);
        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {
    login,
    getAll,
    getUsersById,
    addUsers,
    updateUsers,
    deleteUsers,
};
