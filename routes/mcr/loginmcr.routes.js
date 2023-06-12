const express = require("express");
const { index, login } = require("../../controllers/mcr/loginmcr.controller");

const loginMcrRoutes = express.Router();


loginMcrRoutes.get("/", index);
loginMcrRoutes.post("/", login);


module.exports = loginMcrRoutes;
