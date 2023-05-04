// MVC controller역할 
const fs = require('fs');
const multer = require('multer');
const uploadDir = 'uploads';
const upload = multer({dest: uploadDir});
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
            console.log(req.file);
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