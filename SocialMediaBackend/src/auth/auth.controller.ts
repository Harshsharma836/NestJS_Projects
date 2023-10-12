import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() createAuthDto: Record<string, string>) {
    return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  }

  @Post('register')
  registerIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerIn(createAuthDto);
  }
}
