const express = require('express');
const home = require('./src/routes'); // rounting
const db = require('./src/schemas');
const app = express();
const PORT = 3000;
// const upload = multer({dest: 'uploads/'});
db.connect;
// app setting
app.set('views', './src/views');  // 뷰 관리 디렉토리 MVC패턴 중 V역할
app.set('view engine', 'ejs');  // 뷰 엔진 => ejs

// register middleware => use()
app.use('/', home); // ./src/routes/index.js에서 export한 모듈 적용

app.listen(PORT, () => {
   console.log(`server is sadasdrunning on port ${PORT}`);
});


// 위 모든 주석은 파일이 성공적으로 저장되고 파싱이 성공적으로 완료 되면 저장하는 함수
// + 불러오는 함수!!!

module.exports = app;