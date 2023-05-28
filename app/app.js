const express = require('express');
const home = require('./src/routes'); // rounting
const db = require('./src/schemas');
const app = express();
const PORT = 3000;

db.connect;
app.set('views', './src/views');  // 뷰 관리 디렉토리 MVC패턴 중 V역할
app.set('view engine', 'ejs');  // 뷰 엔진 => ejs
app.use('/', home); // ./src/routes/index.js에서 export한 모듈 적용

app.listen(PORT, () => {
   console.log(`server is running on port ${PORT}`);
});

module.exports = app;