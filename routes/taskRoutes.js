import express from 'express';
const router = express.Router();

// Import the controller functions that have the logic for each route
import {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

/**
 * ROUTES FOR /api/tasks
 */

// Route for getting all tasks and creating a new task
router.route('/')
    .get(getAllTasks)  // GET  /api/tasks
    .post(createTask); // POST /api/tasks

// Route for operations on a specific task using its ID
router.route('/:id')
    .get(getSingleTask)  // GET    /api/tasks/:id
    .put(updateTask)    // PUT    /api/tasks/:id
    .delete(deleteTask); // DELETE /api/tasks/:id

export default router;

