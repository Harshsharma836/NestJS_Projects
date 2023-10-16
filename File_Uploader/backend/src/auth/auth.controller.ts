import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // AuthGuard is provided  , Our Passport local strategy has a default name 'local'
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Prototype : Require Json-token to authorize the user
  @UseGuards(JwtAuthGuard)
  @Post('special')
  async special() {
    return 'Hold';
  }
}
