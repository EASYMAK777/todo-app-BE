import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskInput, UpdateTaskInput } from '../models/task.model';

const taskService = new TaskService();

/**
 * @route GET /tasks
 * @description Get all tasks
 */
export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        return res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching tasks'
        });
    }
};

/**
 * @route POST /tasks
 * @description Create a new task
 * @body { title: string, color: string }
 */
export const createTask = async (req: Request, res: Response) => {
    try {
        const taskData: CreateTaskInput = {
            title: req.body.title,
            color: req.body.color
        };

        const task = await taskService.createTask(taskData);

        return res.status(201).json({
            success: true,
            data: task,
            message: 'Task created successfully'
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * @route PUT /tasks/:id
 * @description Update a task
 * @param id Task ID
 * @body { title?: string, color?: string, completed?: boolean }
 */
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const taskData: UpdateTaskInput = {
            title: req.body.title,
            color: req.body.color,
            completed: req.body.completed
        };

        const task = await taskService.updateTask(Number(id), taskData);
        return res.status(200).json({
            success: true,
            data: task,
            message: 'Task updated successfully'
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(error.message.includes('not found') ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error updating task'
        });
    }
};

/**
 * @route DELETE /tasks/:id
 * @description Delete a task
 * @param id Task ID
 */
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await taskService.deleteTask(Number(id));
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(error.message.includes('not found') ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error deleting task'
        });
    }
};

/**
 * @route PATCH /tasks/:id/toggle-completion
 * @description Toggle task completion status
 * @param id Task ID
 */
export const toggleTaskCompletion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await taskService.toggleCompletion(Number(id));

        return res.status(200).json({
            success: true,
            data: task,
            message: `Task marked as ${task.completed ? 'completed' : 'not completed'}`
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(error.message.includes('not found') ? 404 : 400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error toggling task completion'
        });
    }
}; 