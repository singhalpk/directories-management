import { ERROR_CODES } from '$root/constants/responseCodes';
import { ErrorCode } from '$root/entities/appError';

export class AppError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(errorCode: ErrorCode) {
        const { code, statusCode, message } = ERROR_CODES[errorCode];
        super();
        this.code = code;
        this.statusCode = statusCode;
        this.message = message;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
