import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singIn(@Body() { email, password }) {
    const result = this.authService.login(email, password);
    return result;
  }
}
