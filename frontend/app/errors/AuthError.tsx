export class AuthError {
    public message: string;
    public statusCode?: number;
  
    constructor(message: string, statusCode?: number) {
      this.message = message;
      this.statusCode = statusCode;
    }
  }