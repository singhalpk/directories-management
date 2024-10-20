import { ERROR_CODES } from '$constant/responseCodes';

export type ErrorCode = keyof typeof ERROR_CODES;

export interface ErrorResponse {
  status: 'error';
  message: string;
  error: any;
}
