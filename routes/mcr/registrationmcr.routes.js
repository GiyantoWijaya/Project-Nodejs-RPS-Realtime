const express = require("express");
const { index, validator, create } = require("../../controllers/mcr/registrationmcr.controller");

const registrationMcrRoutes = express.Router();


registrationMcrRoutes.get("/", index);
registrationMcrRoutes.post("/", validator, create);


module.exports = registrationMcrRoutes;
