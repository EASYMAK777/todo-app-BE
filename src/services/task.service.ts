import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error.middleware';
import { Logger } from '../utils/logger';
import { CreateTaskInput, UpdateTaskInput, TaskModel } from '../models/task.model';

const prisma = new PrismaClient();

export class TaskService {
    async createTask(data: CreateTaskInput) {
        try {
            // Validate input
            TaskModel.validateCreate(data);

            return await prisma.Task.create({
                data: {
                    title: data.title,
                    color: data.color,
                },
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes('validation')) {
                throw new AppError(400, error.message);
            }
            Logger.error('Error creating task', error);
            throw new AppError(500, 'Failed to create task');
        }
    }

    async getAllTasks() {
        try {
            return await prisma.Task.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } catch (error) {
            Logger.error('Error fetching tasks', error);
            throw new AppError(500, 'Failed to fetch tasks');
        }
    }

    async updateTask(id: number, data: UpdateTaskInput) {
        try {
            // Validate input
            TaskModel.validateUpdate(data);

            const task = await this.getTaskById(id);
            if (!task) {
                throw new AppError(404, 'Task not found');
            }

            return await prisma.Task.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof AppError) throw error;
            if (error instanceof Error && error.message.includes('validation')) {
                throw new AppError(400, error.message);
            }
            Logger.error(`Error updating task with id ${id}`, error);
            throw new AppError(500, 'Failed to update task');
        }
    }

    async deleteTask(id: number) {
        try {
            const task = await this.getTaskById(id);
            if (!task) {
                throw new AppError(404, 'Task not found');
            }

            return await prisma.Task.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof AppError) throw error;
            Logger.error(`Error deleting task with id ${id}`, error);
            throw new AppError(500, 'Failed to delete task');
        }
    }

    async toggleCompletion(id: number) {
        try {
            const task = await this.getTaskById(id);
            if (!task) {
                throw new AppError(404, 'Task not found');
            }

            return await prisma.Task.update({
                where: { id },
                data: {
                    completed: !task.completed
                },
            });
        } catch (error) {
            if (error instanceof AppError) throw error;
            Logger.error(`Error toggling completion status for task with id ${id}`, error);
            throw new AppError(500, 'Failed to toggle task completion status');
        }
    }

    private async getTaskById(id: number) {
        try {
            return await prisma.Task.findUnique({
                where: { id },
            });
        } catch (error) {
            Logger.error(`Error fetching task with id ${id}`, error);
            throw new AppError(500, 'Failed to fetch task');
        }
    }
} 