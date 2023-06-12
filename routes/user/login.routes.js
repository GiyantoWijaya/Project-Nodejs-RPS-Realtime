const express = require("express");
const { index, login } = require("../../controllers/login.controller");

const loginRoutes = express.Router();

loginRoutes.get("/", index);
loginRoutes.post("/", login);


module.exports = loginRoutes;
