import { SUCCESS_CODES } from '$constant/responseCodes';

export type SuccessCode = keyof typeof SUCCESS_CODES;

export interface SuccessResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}
