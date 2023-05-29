const express = require("express");
const home = require("./src/routes"); // rounting
const db = require("./src/schemas");
const app = express();
const PORT = 3000;
const address = "http://localhost:3000/";

db.connect;
app.set("views", "./app/src/views"); // 뷰 관리 디렉토리 MVC패턴 중 V역할
app.set("view engine", "ejs"); // 뷰 엔진 => ejs
app.use("/", home);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} enter here! ${address}`);
});

module.exports = app;
