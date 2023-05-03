const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
router.get("/users", usersController.getAll);
router.get("/users/:id", usersController.getUsersById);
router.post("/register", usersController.addUsers);
router.post("/login", usersController.login);
router.put("/users/:id", usersController.updateUsers);
router.delete("/users/:id", usersController.deleteUsers);
module.exports = {
    routes: router,
};
