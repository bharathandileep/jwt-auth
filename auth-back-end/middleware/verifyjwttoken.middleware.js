const { accessTokenKey, refreshTokenKey } = require("../config/constants");
const { validateToken } = require("../utils/jwthandler");
const { UNAUTHORIZED } = require("../utils/statusCode");
const jwt = require("jsonwebtoken");

const authJwtToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      res.status(UNAUTHORIZED).json({
        status: "ERROR",
        message: "Unautharized access...! login again",
      });
    }
    const isTokenValid = validateToken(accessToken, accessTokenKey);
    // set user id
    req.userId = isTokenValid.payload;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({
      status: "ERROR",
      message: "token expire...! login again..",
    });
  }
};

const authRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res.status(UNAUTHORIZED).json({
        status: "ERROR",
        message: "Unautharized access...! login again",
      });
    }
    validateToken(refreshToken, refreshTokenKey);

    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({
      status: "ERROR",
      message: "token expire...! login again..",
    });
  }
};

module.exports = { authJwtToken, authRefreshToken };
