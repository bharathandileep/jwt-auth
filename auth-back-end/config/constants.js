require("dotenv").config();

const PORT = process.env.PORT || 8000;

const db_userName = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

const mongoDbUrl = `mongodb+srv://${db_userName}:${db_password}@cluster0.negv8.mongodb.net/`;

const baseUrl = "/api/v1";

module.exports = {
  PORT,
  mongoDbUrl,
  baseUrl,
  refreshTokenKey,
  accessTokenKey,
};
