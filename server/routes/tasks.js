const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controller/tasks');

const router = express.Router();

// Protected routes
router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
