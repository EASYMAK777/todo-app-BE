// Type definitions for Task model
export interface ITask {
    id: number;
    title: string;
    color: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Input type for creating a new Task
export interface CreateTaskInput {
    title: string;
    color: string;
}

// Input type for updating a Task
export interface UpdateTaskInput {
    title?: string;
    color?: string;
    completed?: boolean;
}

// Model validation functions
export class TaskModel {
    private static isValidHexColor(color: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    static validateCreate(data: CreateTaskInput): boolean {
        if (!data.title || data.title.trim().length === 0) {
            throw new Error('Title is required');
        }
        if (data.title.length > 255) {
            throw new Error('Title must be less than 255 characters');
        }
        if (!data.color) {
            throw new Error('Color is required');
        }
        if (!this.isValidHexColor(data.color)) {
            throw new Error('Color must be a valid hex color code (e.g., #FF0000)');
        }
        return true;
    }

    static validateUpdate(data: UpdateTaskInput): boolean {
        if (data.title !== undefined) {
            if (data.title.trim().length === 0) {
                throw new Error('Title cannot be empty');
            }
            if (data.title.length > 255) {
                throw new Error('Title must be less than 255 characters');
            }
        }
        if (data.color !== undefined && !this.isValidHexColor(data.color)) {
            throw new Error('Color must be a valid hex color code (e.g., #FF0000)');
        }
        return true;
    }
} 