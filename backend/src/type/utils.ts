export type Result<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};
