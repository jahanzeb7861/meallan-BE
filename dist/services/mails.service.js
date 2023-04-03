"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsService = void 0;
const common_1 = require("@nestjs/common");
const sendgridMail = require("@sendgrid/mail");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
let MailsService = class MailsService {
    constructor(configService, mailerService) {
        this.configService = configService;
        this.mailerService = mailerService;
        sendgridMail.setApiKey(configService.get('SENDGRID_API_KEY'));
    }
    async send(data) {
        this.mailerService.sendMail({
            to: data.to,
            from: data.from,
            subject: data.subject,
            template: 'forgotPassword',
            context: {
                link: data.data
            }
        });
    }
};
MailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, mailer_1.MailerService])
], MailsService);
exports.MailsService = MailsService;
//# sourceMappingURL=mails.service.js.map