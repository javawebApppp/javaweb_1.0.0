const mongoose = require('mongoose');
const db = require('../schemas');
const connect = require('../schemas').connect;

const drop_db = async () => {
  try {
    await connect();  // 데이터베이스 연결
    const dbName = mongoose.connection.db.databaseName; // 연결된 데이터베이스 이름 가져옴

    await mongoose.connection.db.dropDatabase(); // 연결된 데이터베이스 삭제
    console.log(`Database ${dbName} dropped`);
  } catch (err) {
    console.error("Error dropping the database: ", err);
  }
};

module.exports = drop_db;