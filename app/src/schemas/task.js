const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  name: {
    type: String,
    // notnull이나 유니크 인덱스 같은건 원래 몽고디비에는 해당 설정이 없음. 
    // 몽구스에서 sql처럼 표현하기 위해 추가된 것!
    required: true, 
    //unique: true,   //현재 unique 선정 안함
  },
  ary: {
    type: Array, 
    required: true,
  },

});

module.exports = Task;