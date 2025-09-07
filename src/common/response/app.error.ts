type AppErrorParams = {
  message: string;
  statusCode?: number; // Pode ter valor padrão
  error: string;
};

export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor({ message, statusCode = 400, error }: AppErrorParams) {
    super(message); // chama o construtor da classe Error
    this.statusCode = statusCode;
    this.error = error;

    // Corrige o protótipo para que instanceof funcione corretamente
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
