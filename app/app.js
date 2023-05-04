const express = require('express');
const multer = require('multer');
const fs = require('fs');
const home = require('./src/routes'); // rounting
const app = express();
const PORT = 3000;
// const upload = multer({dest: 'uploads/'});

// app setting
app.set('views', './src/views');  // 뷰 관리 디렉토리 MVC패턴 중 V역할
app.set('view engine', 'ejs');  // 뷰 엔진 => ejs



// register middleware => use()
app.use('/', home); // ./src/routes/index.js에서 export한 모듈 적용

// app.post('/upload',upload.single('datafile'), function(req, res){
//     console.log(req.file);
// });

// 서버 실행 listener
app.listen(PORT, () => {
   console.log('server is running on port 3000');
});

module.exports = app;