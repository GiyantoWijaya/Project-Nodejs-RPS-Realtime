const express = require("express");
const { index } = require("../controllers/index.controller");
const { dashboard } = require("../controllers/dashboard/dashboard.controller");
const { logout } = require("../controllers/login.controller");
const { wrongUrl } = require("../controllers/errors/error.controller");
const registrationRoutes = require("./user/registration.routes");
const loginRoutes = require("./user/login.routes");
const historyRoutes = require("./dashboard/gamehistory.routes")
const multiplayerRoute = require("./dashboard/multiplayerhistory.routes")
const bioDataRoutes = require("./dashboard/biodata.routes")
const playRoutes = require("./play/play.routes")
const usersRoutes = require("./dashboard/users.routes")
const roomsRoutes = require("./dashboard/rooms.routes")

// MCR
const bodyParser = require("body-parser");
const loginMcrRoutes = require("./mcr/loginmcr.routes")
const registrationMcrRoutes = require("./mcr/registrationmcr.routes")

const jsonParser = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: false })

const { auth, guest } = require('../utils/method/method');

const router = express.Router();

// MVC
router.get("/", jsonParser, index);
router.use("/play", urlencoded, auth, playRoutes);
router.use("/registration", urlencoded, guest, registrationRoutes);
router.use("/login", urlencoded, guest, loginRoutes);
router.get("/logout", urlencoded, logout);
router.get("/dashboard", urlencoded, auth, dashboard);
router.use("/history", urlencoded, auth, historyRoutes);
router.use("/multiplayerhistory", urlencoded, auth, multiplayerRoute);
router.use("/biodata", urlencoded, auth, bioDataRoutes);

// admin only
router.use("/users", urlencoded, auth, usersRoutes);
router.use("/rooms", urlencoded, auth, roomsRoutes);

// MCR Gunakan Postman Untuk akses ke route ini
router.use("/loginmcr", jsonParser, loginMcrRoutes);
router.use("/registrationmcr", jsonParser, registrationMcrRoutes);

router.get("*", urlencoded, wrongUrl);


module.exports = router;
