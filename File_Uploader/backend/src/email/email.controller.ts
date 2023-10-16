import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('send')
  async sendEmail(@Body('email') email: string, id) {
    const result = await this.emailService.sendEmail(email, id);
    return { result };
  }
}
