const mongoose = require("mongoose");
const { mongoDbUrl } = require("../config/constants");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoDbUrl);
    console.log(
      "DataBase Connected Successfully!! DB_HOST :",
      connect.connection.host
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILD > ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
