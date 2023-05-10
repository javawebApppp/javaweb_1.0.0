const mongoose = require('mongoose');
const db = require('../schemas');
const CoreModel = mongoose.model('Core', db.Core);
const TaskModel = mongoose.model('Task', db.Task);

const push_core = (core) =>{
    try{
        for (var i=0; i<core.length; i++){
            const Core = new CoreModel({
                name: `core${i}`,
                ary: core[i],
            });
            Core.save();
        }
    }catch(e){
        console.error(e);
    };
};

const push_task = (task) =>{
    for (var i=0; i<task.length; i++){
        const Task = new TaskModel({
            name: `task${i}`,
            ary: task[i],
        });
        Task.save();
    }
};

module.exports = {
    push_core,
    push_task
}