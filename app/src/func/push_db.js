const mongoose = require('mongoose');
const db = require('../schemas');
const CoreModel = mongoose.model('Core', db.Core);
const TaskModel = mongoose.model('Task', db.Task);

const push_core = async (core) => {
  let input = [];
  await Promise.all(core.map(async (coreItem, i) => {
    let ex = { name: `core${i}`, ary: coreItem };
    input.push(ex);
  }));
  await CoreModel.insertMany(input);
};

const push_task = async (core) => {
  let input = [];
  await Promise.all(core.map(async (coreItem, i) => {
    let ex = { name: `task${i}`, ary: coreItem };
    input.push(ex);
  }));
  await TaskModel.insertMany(input);
};

module.exports = {
  push_core,
  push_task
};