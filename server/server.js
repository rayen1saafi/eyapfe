const express = require("express");
const cors = require("cors");
const db_connect = require("./config/db_connect");
require("dotenv").config();
const app = express();

//connect to database
db_connect();
app.use(express.json({ limit: "10000mb" })); // Set the limit for JSON payloads
//add cors
app.use(cors());

//our routes

app.use("/user", require("./routes/userRoute"));
app.use("/pack", require("./routes/packRoute"));
app.use("/cours", require("./routes/coursRoute"));
app.use("/lessons", require("./routes/lessonsRoute"));
app.use("/file", require("./routes/fileRoute"));
app.use("/rating", require("./routes/ratingRoutes"));
app.use("/quizz", require("./routes/QuizzRoute"));
app.use("/question", require("./routes/Question_QuizzRoute"));
app.use("/answer", require("./routes/answerRoute"));
app.use("/answerstudent", require("./routes/answerStudentRoute"));
app.use("/Meet", require("./routes/meetRoute"));


//get port from .env
PORT = process.env.PORT;

//test our server
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("server is running")
);
