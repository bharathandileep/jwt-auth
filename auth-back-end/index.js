const express = require("express");
const connectDB = require("./DB/connectDb");
const { PORT, baseUrl } = require("./config/constants");
const { BAD_REQUEST } = require("./utils/statusCode");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(`${baseUrl}/auth`, authRouter);

app.get("/", (req, res) => {
  res.send("Custom CORS configuration is working");
});


// added new changes in the auth
// new git rules are added to the main branch
// in emp branches

// invalid api URL
app.use("**", (req, res) => {
  res.status(BAD_REQUEST).json({
    messsge: "page not found!",
  });
});

// start script / connect db
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Can't connected to server", err);
    process.exit(1);
  });


