export interface ApiError {
    statusCode: number;
    message: string;
    error: string;
    details?: string;
}
// src/errors/UserNotFoundError.ts
export class UserNotFoundError extends Error {
    constructor(username: string) {
        super(`User with username "${username}" not found`); // Custom error message
        this.name = 'UserNotFoundError'; // Set the error name to something specific
        // This ensures the stack trace is correct
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserNotFoundError);
        }
    }
}
