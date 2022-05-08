const Task = require('../models/task');

async function createTask(req, res, next) {
  try {
    const task = await Task.create({
      userId: req.user.id,
      content: req.body.content,
    });

    res.status(201).send(task);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find({userId: req.user.id});

    res.send(tasks);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    task.content = req.body.content;
    await task.save();

    res.status(200).send(task);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    res.status(200).send(task);
  } catch (err) {
    res.send({message: err.message});
  }
}

module.exports = {getTasks, createTask, updateTask, deleteTask};
