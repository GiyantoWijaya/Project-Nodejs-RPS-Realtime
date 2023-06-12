const express = require("express");
const { index, show, update, deletedata } = require("../../controllers/dashboard/users.controller");


const usersRoutes = express.Router();


usersRoutes.get("/", index);
usersRoutes.get("/:id", show);
usersRoutes.patch("/:id", update);
// usersRoutes.delete("/:id", deletedata);


module.exports = usersRoutes;
