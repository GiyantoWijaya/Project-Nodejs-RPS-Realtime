const express = require("express");
const { index, gamecomp, createRoom, joinRoom } = require("../../controllers/play.controller");

const playRoutes = express.Router();


playRoutes.get("/", index);
playRoutes.post("/createroom", createRoom);
playRoutes.get("/joinroom", joinRoom);
playRoutes.get("/playvscomp", gamecomp);
playRoutes.get("/multiplayers", createRoom);
playRoutes.get("/multiplayers/:id", createRoom);


module.exports = playRoutes;
