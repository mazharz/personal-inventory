export type InternalResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};
