import { Controller, Post, Body, Param, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ForgotPasswordDto } from './dto/forgot_password.dto';
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

  @Post('forgotpassword/:email')
  async sendEmailPassword(@Param('email') email : string) {
    try {
      let isEmailSend = await this.authService.sendEmailForgotPassword(
      email,
      );
      if (isEmailSend != null) {
        return isEmailSend;
      } else {
        return 'failded to set email';
      }
    } catch (err) {
      return `Something went wrong ${err}`;
    }
  }

  // For Ferify the User.
  @Get('verifypassword')
  async verifyUser(@Body() verifyOtpDTO : VerifyOtpDTO  ){
    let isValid = await this.authService.verifyOtp(verifyOtpDTO);
    return isValid
  }
}
