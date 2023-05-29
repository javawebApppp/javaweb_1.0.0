const { pop_core, pop_task } = require("./pop_db");

async function prettier(type, num, corenum, tasknum) {
  const ary = {};
  ary.min = [];
  ary.max = [];
  ary.avg = [];
  if (type === "core") {
    for (var i = 0; i < tasknum; i++) {
      const tasks = await pop_task(i);
      if (!tasks) {
        return null;
      }
      const ex_ary = [];
      for (var j = Number(num); j < tasks.length; j += Number(corenum)) {
        ex_ary.push(tasks[j]);
      }
      ary.min.push(Math.min(...ex_ary));
      ary.max.push(Math.max(...ex_ary));
      ary.avg.push(ex_ary.reduce((acc, cur) => acc + cur, 0) / ex_ary.length);
    }
  } else {
    for (var i = 0; i < corenum; i++) {
      const cores = await pop_core(i);
      if (!cores) {
        return null;
      }
      const ex_ary = [];
      for (var j = Number(num); j < cores.length; j += Number(tasknum)) {
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
