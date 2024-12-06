const express = require("express");
const {
  loginHandler,
  registerHandler,
  logoutHandler,
  homeHandler,
  refreshTokenhandler,
} = require("../controlles/auth.controller");
const {
  authJwtToken,
  authRefreshToken,
} = require("../middleware/verifyjwttoken.middleware");

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);

router.get("/refresh-token", authRefreshToken, refreshTokenhandler);

router.get("/home", authJwtToken, homeHandler);

module.exports = router;
