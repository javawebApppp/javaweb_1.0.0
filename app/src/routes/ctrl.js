const { parse, drop_db, push_core, push_task, prettier } = require('../func');
const fs = require('fs');
const multer = require('multer');
const uploadDir = 'uploads';
const upload = multer({ dest: uploadDir });
const inputNumbers = require('../../inputnumber');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const updateInputNumbers = async (newCorenum, newTasknum) => {
    try {
        const content = `const inputNumbers = {
    corenum: ${newCorenum},
    tasknum: ${newTasknum}
  };
  
  module.exports = inputNumbers;\n`;

        await fs.writeFileSync('./inputnumber.js', content, 'utf8');
    } catch (e) {
        console.log('updateinputnumber error');
    }
};


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
            const oldPath = req.file.path;
            const newPath = `${req.file.destination}/${originalName}`;
            fs.rename(oldPath, newPath, (err) => {  // filename으로 이름 바꾸기
                if (err) {
                    console.log('Error renaming file:', err);
                    res.status(400).send('Bad Request');
                } else {
                    console.log(`File renamed from ${oldPath} to ${newPath}`);
                }
            });
            const data = await fs.promises.readFile(`./${newPath}`, 'utf8');
            const array = data.split('\n');

            try {
            const corenum = Number(req.body.coreNum);
            const tasknum = Number(req.body.taskNum);
            await updateInputNumbers(corenum, tasknum);

            const job = await parse(array, req.body.coreNum, req.body.taskNum); // job[0] => core, job[1] => task
            // Promise.all([push_core(job[0]), push_task(job[1])]);
            // push_core(job[0]);          // drop하고 데이터 넣기
            // push_task(job[1]);          // core와 task는 0idx~

            push_core(job[0]); // await를 이용하여 비동기 작업이 완료될 때까지 기다립니다.
            console.log('push_core completed successfully');
        
            push_task(job[1]); // await를 이용하여 비동기 작업이 완료될 때까지 기다립니다.
            console.log('push_task completed successfully');

            res.redirect('/')
            } catch (err) {
                res.status(400).send('<script>alert("오류입니다. input파일을 확인하세요"); window.location.href="/";</script>');
            }
        }
    };
    if (req.method === "POST") {
        await drop_db();
        uploaded(req, res, uploadCallback);
    } else {
        res.render('index',  inputNumbers)
    }
};

const spread_data = async (req, res) => {
    try {
        const type = req.params.type;
        const num = req.params.num;
        const corenum = inputNumbers.corenum;
        const tasknum = inputNumbers.tasknum;
        const data = await prettier(type, num, corenum, tasknum);
        return res.json(data);
    } catch (e) {
        console.log('spread_data error');
    }
};


module.exports = {
    uploadFile,
    spread_data,
}