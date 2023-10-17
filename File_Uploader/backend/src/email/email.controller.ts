import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  // No Require we are directly calling Email Services from other modules.
}
