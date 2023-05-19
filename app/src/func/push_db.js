const mongoose = require('mongoose');
const db = require('../schemas');
const CoreModel = mongoose.model('Core', db.Core);
const TaskModel = mongoose.model('Task', db.Task);

const push_core = async (core) => {
  try {
    const promises = core.map(async (coreItem, i) => {
      const Core = new CoreModel({
        name: `core${i}`,
        ary: coreItem,
      });
      return Core.save(); // return을 이용하여 Promise 반환
    });
    await Promise.all(promises);
    console.log('Core data saved successfully');
  } catch (e) {
    console.log('푸시에러');
  }
};

const push_task = async (task) => {
  try {
    const promises = task.map(async (taskItem, i) => {
      const Task = new TaskModel({
        name: `task${i}`,
        ary: taskItem,
      });
      return Task.save(); // return을 이용하여 Promise 반환
    });
    await Promise.all(promises);
    console.log('Task data saved successfully');
  } catch (e) {
    console.log('푸시에러');
  }
};




module.exports = {
  push_core,
  push_task
};