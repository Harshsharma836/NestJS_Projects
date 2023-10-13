import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('send')
  async sendEmail() {
    const result = await this.emailService.sendEmail();
    return { result };
  }
}
