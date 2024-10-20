import { SUCCESS_CODES } from '$root/constants/responseCodes';
import { Request, Response } from '$root/entities';
import { SuccessCode, SuccessResponse } from '$root/entities/apiResponse';
import { NextFunction } from 'express';

export const successResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function <T>(
    code: SuccessCode = SUCCESS_CODES.READ.code,
    data: T,
  ): Response {
    const status = SUCCESS_CODES[code].statusCode;
    const response: SuccessResponse<T> = {
      status,
      success: true,
      message: SUCCESS_CODES[code].message,
      data,
    };
    return res.status(status).json(response);
  };
  next();
};
