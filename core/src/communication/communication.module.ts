import { EmailService } from '@app/communication/email.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class CommunicationModule {}
