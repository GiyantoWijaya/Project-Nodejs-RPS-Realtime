const express = require("express");
const { index, create, show, update, deletedata } = require("../../controllers/dashboard/multiplayerhistory.controller");

const multiplayerRoute = express.Router();

multiplayerRoute.get("/", index);
multiplayerRoute.get("/:id", show);
multiplayerRoute.post("/", create);
multiplayerRoute.patch("/:id", update);
multiplayerRoute.delete("/:id", deletedata);


module.exports = multiplayerRoute;