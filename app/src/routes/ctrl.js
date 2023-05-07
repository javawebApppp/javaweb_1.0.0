// MVC controller역할 
const { time } = require('console');
const parse = require('../func/parser');
const fs = require('fs');
const multer = require('multer');
const { parseArgs } = require('util');
const uploadDir = 'uploads';
const upload = multer({dest: uploadDir});  // upload 디렉토리 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

const home = (req, res) => {  // get()함수 내부의 콜백 함수가 controller역할
    res.render("index");
};

const login = (req, res) => {
    res.render("login");
};

const uploadFile = (req, res) => {
    // 파일 저장하고 홈 페이지로 리다이렉트 해야함
    const uploaded = upload.single('datafile');
    const uploadCallback = (err) => {
        if (err instanceof multer.MulterError) {
            console.log('Multer Error:', err);
            res.status(400).send('Bad Request');
        } else if (err) {
            console.log('Error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const originalName = req.file.originalname;
            const oldPath = req.file.path; //+Date.now()
            const newPath = `${req.file.destination}/${originalName}`;
            fs.rename(oldPath, newPath, (err) => {  // filename으로 이름 바꾸기
                if (err) {
                  console.log('Error renaming file:', err);
                } else {
                  console.log(`File renamed from ${oldPath} to ${newPath}`);
                }
              });

            var array = fs.readFileSync(`./${newPath}`).toString().split("\n");
            array.splice(0, 0, 0); // 모듈러 연산으로 파싱하기 위해 0번째에 빈 값 넣기
            var core = [];
            for (var i = 0; i < 5; i++){
                core[i] = [];
            }
            var task = [];
            for (var i = 0; i < 5; i++){
                task[i] = [];
            }
            var core_i = 0;

            for(i in array) {
                if(i % 7 == 0 || i % 7 == 1){
                    core_i = 0;
                    continue;
                }

                var ex = array[i].split('\t');
                ex.pop();
                ex.shift();
                if (ex.length != 5){
                    alert('분석 가능한 input을 넣어주세요')
                    return res.redirect('/');
                }
                for(var k = 0; k < ex.length; k++){
                    try{
                        core[core_i].push(Number(ex[k]));
                    }catch(e){
                        alert('숫자만 분석할 수 있습니다.');
                        return res.redirect('/');
                    }
                }
                for (var k = 0; k < ex.length; k++){
                    task[k].push(Number(ex[k]))
                }
                core_i++;
            }
            console.log(core);
            console.log(task);
            // fs.readFile(`./${newPath}`, 'utf-8', (err, data) => {
            //     if (err) {
            //         console.log('Error renaming file:', err);
            //     }
            //     else {
            //         parse(data);
            //     }
            // });
            res.redirect('/');
        }        
    };
    if (req.method === "POST"){
        uploaded(req, res, uploadCallback);
    } else{
        res.render('upload')
    }
};

module.exports = {
    home,
    login,
    uploadFile,
}