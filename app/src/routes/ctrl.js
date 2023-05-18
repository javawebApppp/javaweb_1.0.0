const func = require('../func');
const fs = require('fs');
const multer = require('multer');
const prettier = require('../func/spread_data').prettier;
const uploadDir = 'uploads';
const upload = multer({ dest: uploadDir });  

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const uploadFile = async (req, res) => {
    // 파일 저장하고 홈 페이지로 리다이렉트 해야함
    const uploaded = upload.single('datafile');
    const uploadCallback = async (err) => {
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
            fs.rename(oldPath, newPath, async (err) => {  // filename으로 이름 바꾸기
                if (err) {
                    console.log('Error renaming file:', err);
                } else {
                    console.log(`File renamed from ${oldPath} to ${newPath}`);

                    const array = fs.readFileSync(`./${newPath}`).toString().split("\n");

                    try {
                        const job = await func.parse(array, req.body.coreNum, req.body.taskNum); // job[0] => core, job[1] => task
                        const corenum = Number(req.body.coreNum);
                        const tasknum = Number(req.body.taskNum);

                        func.push_db.push_core(job[0]);         // drop하고 데이터 넣기
                        func.push_db.push_task(job[1]);         // core와 task는 0idx~
                        res.redirect("/");
                    } catch (err) {
                        res.status(400).send('<script>alert("오류입니다. input파일을 확인하세요"); window.location.href="/";</script>');
                        res.redirect('/')
                    }
                }
            });
        }
    };
    if (req.method === "POST") {
        if (req.coreNum === null || req.taskNum === null){
            console.log("Core와 Task의 수를 확인해주세요");
            res.redirect('/')
        }else{
            await func.drop_db();
            uploaded(req, res, uploadCallback);
        }
    } else {
        res.render('index')
    }
};

const spread_data = (req, res) => {
    const type = req.params.type;
    const num = req.params.num;
    const data = prettier(type, num);//, corenum, tasknum); 
    res.json(data); 
  };

module.exports = {
    uploadFile,
    spread_data,
}