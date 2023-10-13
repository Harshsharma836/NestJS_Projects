import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyOtpDTO } from './dto/verify_otp.dto';

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

  // For Sending Otp
  @Post('forgotpassword/:email')
  async sendEmailPassword(@Param('email') email: string) {
    try {
      const isEmailSend = await this.authService.sendEmailForgotPassword(email);
      if (isEmailSend != null) {
        return isEmailSend;
      } else {
        return 'failded to set email';
      }
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }

  // For Verifying the User.
  @Get('verifypassword')
  async verifyUser(@Body() verifyOtpDTO: VerifyOtpDTO) {
    const isValid = await this.authService.verifyOtp(verifyOtpDTO);
    return isValid;
  }
}
