import { Request as CoreRequest, Response as CoreResponse } from 'express';
import { Transaction } from 'sequelize';
import { SuccessCode } from './apiResponse';

export interface Request extends CoreRequest {
  transaction?: Transaction; // Optional property to hold the transaction
  user?: string | object;
}

export interface Response extends CoreResponse {
  // eslint-disable-next-line no-unused-vars
  success: <T>(code: SuccessCode, data: T) => Response;
}
