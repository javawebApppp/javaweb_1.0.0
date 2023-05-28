const mongoose = require('mongoose');
const db = require('../schemas');
const CoreModel = mongoose.model('Core', db.Core);
const TaskModel = mongoose.model('Task', db.Task);

const pop_core = async (num) => {
    try {
      return await CoreModel.findOne({ name: `core${num}` })
      .then((core)=>{
        return core.ary;
      });
    } catch (err) {
      console.error('db에 파일을 넣어주세요');
      return null;
    }
};

const pop_task = async (num) => {
    try {
      return await TaskModel.findOne({ name: `task${num}` })
      .then((task)=>{
        return task.ary;
      });
    } catch (err) {
      console.error('db에 파일을 넣어주세요');
      return null;
    }
};

module.exports = {
  pop_core,
  pop_task
}