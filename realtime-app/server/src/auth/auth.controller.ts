// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }): Promise<{ token: string }> {
    console.log("I am hit")
    const token = this.authService.loginUser(loginDto.username, loginDto.password);
    return { token };
  }
}
