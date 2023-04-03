import { ConfigService } from '@nestjs/config';
import { MailDataDto } from 'src/dtos/mails/mail-data.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class MailsService {
    private configService;
    private mailerService;
    constructor(configService: ConfigService, mailerService: MailerService);
    send(data: MailDataDto): Promise<void>;
}
