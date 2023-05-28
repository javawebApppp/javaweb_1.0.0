const mongoose = require('mongoose');
const Core = require('./core');
const Task = require('./task');

const uri = "mongodb+srv://jungtaekwon1019:password_for_javaweb@taekwon.yl7ee71.mongodb.net/?retryWrites=true&w=majority";
let connection;

// 몽구스 연결 함수
const connect = () => {
  return new Promise((resolve, reject) => {
    const connection = mongoose.connect(uri, {
      dbName: 'nodejs',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connection successful');
      resolve(connection, mongoose);
    })
    .catch((error) => {
      console.log('MongoDB connection error', error);
      reject(error);
    });
  });
};
connect()
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect(); // 연결 재시도
});

const dropDatabase = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase()
      .then(() => {
        console.log('Database dropped successfully.');
        resolve();
      })
      .catch((error) => {
        console.log('Error dropping the database:', error);
        reject(error);
      });
  });
};

module.exports = {
  connect,
  dropDatabase,
  Core,
  Task,
  connection,
};