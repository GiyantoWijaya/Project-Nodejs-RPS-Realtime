const express = require("express");
const { index, show, update, deletedata } = require("../../controllers/dashboard/rooms.controller");


const roomsRoutes = express.Router();


roomsRoutes.get("/", index);
roomsRoutes.get("/:id", show);
roomsRoutes.patch("/:id", update);
// roomsRoutes.delete("/:id", deletedata);


module.exports = roomsRoutes;
