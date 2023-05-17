// MVC controller역할 
const { time } = require('console');
const func = require('../func');
const fs = require('fs');
const multer = require('multer');
const { parseArgs } = require('util');
const uploadDir = 'uploads';
const upload = multer({dest: uploadDir});  // upload 디렉토리 생성
var corenum = 0;
var tasknum = 0;
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

const home = (req, res) => {  // get()함수 내부의 콜백 함수가 controller역할
    res.render("index");
};

const analyze = (req, res) => {
    res.render("analyze");
};

const ex = (req, res) => {
    res.render("aa");
};

const uploadFile = async(req, res) => {
    // 파일 저장하고 홈 페이지로 리다이렉트 해야함
    const uploaded = upload.single('datafile');
    const uploadCallback = async(err) => {
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
            fs.rename(oldPath, newPath, async(err) => {  // filename으로 이름 바꾸기
                if (err) {
                    console.log('Error renaming file:', err);
                } else {
                    console.log(`File renamed from ${oldPath} to ${newPath}`);
            
                    var array = fs.readFileSync(`./${newPath}`).toString().split("\n");
            
                    try {
                        const job = func.parse(array, req.body.coreNum, req.body.taskNum); // job[0] => core, job[1] => task
                        corenum = Number(req.body.coreNum);
                        tasknum = Number(req.body.taskNum);
                        // controller 코드
                        try {
                            func.pop_db.pop_core(1); //db에 데이터가 없으면 
                            await func.drop_db();     // 여기서 await를 사용하여 함수가 완료될 때까지 기다립니다.
                        } catch (err) {
                            console.log("there is no data, init data");
                        } finally {
                            func.push_db.push_core(job[0]);         // drop하고 데이터 넣기
                            func.push_db.push_task(job[1]);         // core와 task는 0idx~
                            res.redirect("/");
                        }
                        
                        
                    } catch(err) {
                        res.status(400).send('<script>alert("오류입니다. input파일을 확인하세요"); window.location.href="/";</script>');
                        res.redirect('/')
                    }
                }
            });
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
    analyze,
    uploadFile,
    ex,
    corenum,
    tasknum,
}