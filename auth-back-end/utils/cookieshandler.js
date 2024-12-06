const { generateToken } = require("./jwthandler");

const setCookies = (tokenName, res, payload, secretKey, expTime) => {
  const token = generateToken(payload, secretKey, expTime);

  const options = { httpOnly: true, sameSite: "None", secure: true };

  res.cookie(tokenName, token);
};

module.exports = setCookies;
