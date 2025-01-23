import { Router } from 'express';
import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    toggleTaskCompletion
} from '../controllers/task.controller';

const router = Router();

// Get all tasks
router.get('/', getAllTasks);

// Create a new task
router.post('/', createTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

// Toggle task completion status
router.patch('/:id/toggle-completion', toggleTaskCompletion);

export default router; 