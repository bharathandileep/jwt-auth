const jwt = require("jsonwebtoken");

const generateToken = (payload, secretKey, exprTime) => {
  return jwt.sign({ payload }, secretKey, { expiresIn: exprTime });
};


const validateToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  validateToken,
};
