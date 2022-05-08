const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  content: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
