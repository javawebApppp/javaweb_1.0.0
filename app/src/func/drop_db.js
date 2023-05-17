// const mongoose = require('mongoose');
const db = require('../schemas');

const drop_db = async () => {
  // 마지막으로 반환된 Promise를 반환합니다.
  return new Promise(async (resolve, reject) => {
    try {
      resolve(); // 작업이 완료되면 resolve를 호출해 Promise가 완료됨을 나타냅니다.
    } catch (err) {
      console.log("Database dropped");
    }
  });
};


module.exports = drop_db;
