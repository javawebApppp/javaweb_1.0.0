const lineReader = require('line-reader');
const fs = require('fs');

const parse = (data) => {
    lineReader.eachLine('./uploads/input.txt', (line, last)=>{
        console.log(line);
    });
};

module.exports = parse;