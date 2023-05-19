const { pop_core, pop_task } = require('./pop_db');

function prettier(type, num, corenum, tasknum) {
    const ary = {};
    ary.min = [];
    ary.max = [];
    ary.avg = [];
    if (type === 'core'){
        for(var i = 0; i<tasknum; i++){
            const tasks = pop_task(i);
            const ex_ary = [];
            for(var j = num; j<tasks.length; j += corenum){
                ex_ary.push(tasks[j]);
            }
            ary.min.push(Math.min(...ex_ary));
            ary.max.push(Math.max(...ex_ary));
            ary.avg.push(ex_ary.reduce((acc, cur) => acc + cur, 0) / ex_ary.length);

        }
    }else{
        for(var i = 0; i<corenum; i++){
            const cores = pop_core(i);
            const ex_ary = [];
            for(var j = num; j<cores.length; j += tasknum){
                ex_ary.push(cores[j]);
            }
            ary.min.push(Math.min(...ex_ary));
            ary.max.push(Math.max(...ex_ary));
            ary.avg.push(ex_ary.reduce((acc, cur) => acc + cur, 0) / ex_ary.length);

        }
    }
    
    return ary;
}

module.exports = prettier;
