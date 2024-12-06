const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const compairePassword = async (reqPassword,hashedPassword ) => {
  return await bcrypt.compare(reqPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  compairePassword,
};
