const mongoose = require("mongoose");
const { Schema } = mongoose;

const Task = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ary: {
    type: Array,
    required: true,
  },
});

module.exports = Task;
