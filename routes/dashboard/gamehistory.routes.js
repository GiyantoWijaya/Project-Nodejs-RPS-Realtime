const express = require("express");
const { index, create, show, deletedata } = require("../../controllers/dashboard/usergamehistory.controller");

const historyRoutes = express.Router();

historyRoutes.get("/", index);
historyRoutes.post("/", create);
historyRoutes.get("/:id", show);
historyRoutes.delete("/:id", deletedata);


module.exports = historyRoutes;
