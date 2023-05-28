'use strict';
const { parse, drop_db, push_core, push_task, prettier } = require('../func');
const fs = require('fs');
const multer = require('multer');
const uploadDir = 'uploads';
const inputNumbers = require('../../inputnumber');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'inputFile.txt');
  }
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('datafile');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const uploadFile = async (req, res) => {
    if (req.method === "POST") {
        await drop_db();
        await uploadMiddleware(req, res, async (err) => {
            if (err) {
                console.log('Error:', err);
                res.status(500).send('Internal Server Error');
            } else if (!req.file){
                return res.status(400).send('<script>alert("datafile이 없습니다. 파일을 선택해주세요."); window.location.href="/";</script>');
            } else {
                const { datafile, coreNum, taskNum } = req.body;
                if (!coreNum || !taskNum) {
                    return res.status(400).send('<script>alert("coreNum 또는 taskNum이 없습니다. 값을 입력해주세요."); window.location.href="/";</script>');
                }

                const data = await fs.promises.readFile('./uploads/inputFile.txt', 'utf8');
                const array = data.split('\n');

                try {
                    const corenum = Number(req.body.coreNum);
                    const tasknum = Number(req.body.taskNum); 
                    await updateInputNumbers(corenum, tasknum);
                    const job = await parse(array, req.body.coreNum, req.body.taskNum);
                    push_core(job[0]);
                    console.log('push_core completed successfully');
                    push_task(job[1]);
                    console.log('push_task completed successfully');

                    delete require.cache[require.resolve('../../inputnumber')];
                    const updatedInputNumbers = require('../../inputnumber');
                    res.render('../views/index', { data: updatedInputNumbers });

                } catch (err) {
                    res.status(400).send('<script>alert("적절하지 못한 데이터 입니다. 다시 확인하세요"); window.location.href="/";</script>');
                }
            }
        });
    } else {
        const updatedInputNumbers = require('../../inputnumber');
        res.render('../views/index', { data: updatedInputNumbers });
    }
};

const updateInputNumbers = async (newCorenum, newTasknum) => {
    try {
        const content = `const inputNumbers = {
    corenum: ${newCorenum},
    tasknum: ${newTasknum}
  };
  
  module.exports = inputNumbers;\n`;

        await fs.promises.writeFile('./inputnumber.js', content, 'utf8');
    } catch (e) {
        console.log('updateinputnumber error');
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