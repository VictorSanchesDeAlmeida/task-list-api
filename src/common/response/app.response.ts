type AppResponseParams<T> = {
  message: string;
  statusCode: number;
  result: string;
  data?: T;
};

export class AppResponse<T> {
  private readonly message: string;
  private readonly statusCode: number;
  private readonly result: string;
  private readonly data?: T;

  constructor({ message, statusCode, result, data }: AppResponseParams<T>) {
    this.message = message;
    this.statusCode = statusCode;
    this.result = result;
    this.data = data;
  }
}
