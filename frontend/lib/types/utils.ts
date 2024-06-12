export type Result<T = unknown> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    message: string;
  };
