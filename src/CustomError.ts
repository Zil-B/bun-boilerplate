import { AxiosError } from "axios";

export class CustomError extends Error {
  constructor(prefix: string, originalError: unknown) {
    if (originalError instanceof AxiosError) {
      super(`[${prefix}] ERROR - ${originalError.message} - ${originalError} - ${originalError.code}`);
      this.stack = originalError.stack;
    } else if (originalError instanceof Error) {
      super(`[${prefix}] ERROR - ${originalError.message} - ${originalError}`);
      this.stack = originalError.stack;
    } else {
      super(`[${prefix}] ERROR - ${String(originalError)}`);
    }
  }
}
