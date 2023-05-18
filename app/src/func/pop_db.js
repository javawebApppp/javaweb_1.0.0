// name이 "core1"인 문서 조회
const num = require('../routes/ctrl');
const mongoose = require('mongoose');
const db = require('../schemas');
const CoreModel = mongoose.model('Core', db.Core);
const TaskModel = mongoose.model('Task', db.Task);


const pop_core = async (num) => {
    try {
      await CoreModel.findOne({ name: `core${num}` })
      .then((core)=>{
        return core.ary;
      });
    } catch (err) {
      console.error(err);
    }
};

const pop_task = async (num) => {
    try {
      await TaskModel.findOne({ name: `task${num}` })
      .then((task)=>{
        return task.ary;
      });
    } catch (err) {
      console.error(err);
    }
};

// const pop_core = () => {
//   var core_ary = [];
//   for(var i = 0; i<num.corenum; i++) {
//     try {
//       const core = CoreModel.findOne({ name: `core${i}` });
//       core_ary.push(core);
//     } catch (err) {
//       console.error(err);
//     }
//   return core_ary;
// }};

// const pop_task = () => {
//   var task_ary = [];
//   for(var i = 0; i<num.tasknum; i++) {
//     try {
//       const task = TaskModel.findOne({ name: `task${i}` });
//       task_ary.push(task);
//     } catch (err) {
//       console.error(err);
//     }
//   return core_ary;
// }};

module.exports = {
  pop_core,
  pop_task
}