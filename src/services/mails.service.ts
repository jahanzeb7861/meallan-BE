import { Injectable } from '@nestjs/common';
import * as sendgridMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { MailDataDto } from 'src/dtos/mails/mail-data.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {

    constructor(private configService: ConfigService,private mailerService : MailerService) {
        sendgridMail.setApiKey(configService.get('SENDGRID_API_KEY'))
    }

    async send(data: MailDataDto) {
        this.mailerService.sendMail({
            to: data.to,
            from: data.from,
            subject:data.subject,
            template: 'forgotPassword',
            context: {
                link : data.data
            }
        })
       
    //  await sendgridMail.send({
    //     from: data.from,
    //     to:data.to,
    //     subject:data.subject,
    //     html:data.html
    //  })
    }
}