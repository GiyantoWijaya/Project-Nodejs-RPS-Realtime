const express = require("express");
const { index, validator, show, create, update, deletedata } = require("../../controllers/dashboard/usergamebiodata.controller");


const bioDataRoutes = express.Router();


bioDataRoutes.get("/", index);
bioDataRoutes.get("/:id", show);
bioDataRoutes.post("/", validator, create);
bioDataRoutes.patch("/:id", validator, update);
bioDataRoutes.delete("/:id", deletedata);


module.exports = bioDataRoutes;
