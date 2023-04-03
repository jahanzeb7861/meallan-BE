import { Module } from '@nestjs/common';
import { MailsService } from 'src/services/mails.service';

@Module({
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}