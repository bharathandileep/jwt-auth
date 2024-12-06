const {
  SUCCESS,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../utils/statusCode");
const userSchema = require("../models/user.model");
const { hashPassword, compairePassword } = require("../utils/hashPassword");
const setCookies = require("../utils/cookieshandler");
const { accessTokenKey, refreshTokenKey } = require("../config/constants");

const registerHandler = async (req, res) => {
  try {
    const { firstName, lastName, password, userName, email } = req.body;
    // todo:validate body
    console.log(req.body);
    const isUserExsit = await userSchema.findOne({
      $or: [{ email }, { userName }],
    });

    if (isUserExsit) {
      return res.status(BAD_REQUEST).json({
        status: "ERROR",
        message: "user with email or user name is already present!",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new userSchema({
      firstName,
      lastName,
      password: hashedPassword,
      userName,
      email,
    });

    const isUserCreated = await newUser.save();
    if (!isUserCreated) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: "ERROR",
        message: "internal sever error...!,try after sometime.",
      });
    }
    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "register success",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "internal sever error...!,try after sometime.",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    //todo : validate req body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmail = emailRegex.test(identifier);

    // Dynamically construct the query based on the identifier type
    let query = {};
    if (isEmail) {
      query = { email: identifier };
    } else {
      query = { userName: identifier };
    }

    const isUserPresent = await userSchema.findOne(query);
    if (!isUserPresent) {
      return res.status(BAD_REQUEST).json({
        status: "ERROR",
        message: "invalid user credentials!",
      });
    }
    const isPasswordCorrect = await compairePassword(
      password,
      isUserPresent?.password
    );
    if (!isPasswordCorrect) {
      return res.status(BAD_REQUEST).json({
        status: "ERROR",
        message: "invalid user credentials!",
      });
    }

    setCookies("accessToken", res, isUserPresent._id, accessTokenKey, "10m");
    setCookies("refreshToken", res, isUserPresent._id, refreshTokenKey, "15d");

    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "login success",
      data: isUserPresent,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "internal sever error...!,try after sometime.",
    });
  }
};

const refreshTokenhandler = async (req, res) => {
  try {
    const { userId } = req.body;
    setCookies("accessToken", res, userId, accessTokenKey, "10m");
    return res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "created new access token",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "internal sever error...!,try after sometime.",
    });
  }
};

const logoutHandler = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(SUCCESS).json({
      status: "SUCCESS",
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: "internal sever error...!,try after sometime.",
    });
  }
};

const homeHandler = async (req, res) => {
  return res.status(SUCCESS).json({ message: "success" });
};

module.exports = {
  loginHandler,
  registerHandler,
  logoutHandler,
  homeHandler,
  refreshTokenhandler,
};
