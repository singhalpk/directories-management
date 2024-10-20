import { Request, Response } from 'express';
import { ERROR_CODES } from '$root/constants/responseCodes';
import { AppError } from '$root/utils/appError';

export function errorHandler(err: AppError, req: Request, res: Response) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  } else {
    res.status(ERROR_CODES.INTERNAL_SERVER.statusCode).json({
      code: ERROR_CODES.INTERNAL_SERVER.code,
      message: ERROR_CODES.INTERNAL_SERVER.message,
    });
  }
}
