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

// const mongoose = require('mongoose');
// const CoreModel = mongoose.model('Core', db.Core);

// for(var i = 0;i<5;i++){
//    const Core = new CoreModel({
//       name: `core${i}`,
//       ary: [1, 2, 3, 4, 5],
//    });
   
//    // 새로운 Core 데이터를 저장합니다.
//    Core.save();
// };
//위와 같은 형태로 데이터가 들어왔을 때 db에 저장하면 됨

// name이 "name1"인 문서 조회
// async function findCore() {
//    try {
//      const core = await CoreModel.findOne({ name: "core1" });
//      console.log(core.ary);
//    } catch (err) {
//      console.error(err);
//    }
//  }
 
//  findCore();
// 위와 같은 형태로 데이터를 db에서 불러올 수 있음!!!!

// 위 모든 주석은 파일이 성공적으로 저장되고 파싱이 성공적으로 완료 되면 저장하는 함수
// + 불러오는 함수!!!

module.exports = app;