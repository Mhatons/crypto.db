const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");
require("express-async-errors"); //async errors
const Phrase = require("./routes/phrase");
const Admin = require("./routes/admin");

//app config
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 8500;

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world and yey my app is running live");
});

app.use("/api/v1/phrase", Phrase);
app.use("/api/v1/admin", Admin);

app.get("*", (req, res) => {
  res.redirect("/api/v1");
});
//listener
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
