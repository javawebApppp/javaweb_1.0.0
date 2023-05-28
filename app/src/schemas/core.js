const mongoose = require('mongoose'); //왜 mongoDB를 사용하냐면, 배열을 넣을 수 있음
const { Schema } = mongoose;

const Core = new Schema({
  name: {
    type: String,
    required: true, 
    unique: true, 
  },
  ary: {
    type: Array, 
    required: true,
  },

});

module.exports = Core;