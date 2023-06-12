const express = require("express");
const { index, validator, create } = require("../../controllers/registration.controller");


const registrationRoutes = express.Router();

registrationRoutes.get("/", index);

registrationRoutes.post("/", validator, create);



module.exports = registrationRoutes;
