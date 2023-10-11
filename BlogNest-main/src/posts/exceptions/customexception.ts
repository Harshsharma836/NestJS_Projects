import { HttpException } from '@nestjs/common';
// custom exception .
export class customException extends HttpException {
  constructor(message: string, statuscode: number) {
    super(message, statuscode);
  }
}
