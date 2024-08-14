import { Inject, Injectable } from '@nestjs/common';
import { Mail, MAIL_MODULE_OPTIONS, MailConfig } from './mail.consts';
import { SES } from 'aws-sdk';
import * as mimemessage from 'mimemessage';
import { MailConfigurationTypeEnum } from './enums/mail-configuration-type.enum';
import { MailModuleOptions } from './interfaces/mail-module-options.interface';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MailService {

    constructor(
        @Inject(MAIL_MODULE_OPTIONS) private readonly mailConfig: MailModuleOptions,
        private readonly httpService: HttpService,
    ) { }

    async send(mail: Mail) {

        switch (this.mailConfig.mailConfigurationType) {
            case MailConfigurationTypeEnum.AWS:
                await this.sendWithSES(mail);
                break;

            case MailConfigurationTypeEnum.GMAIL:
                await this.sendWithGmail(mail);
                break;
        }

    }

    async createRawEmail(mail: Mail) {

        const messageParts = [
            `From: ${mail.from}`,
            `To: ${mail.to}`,
            `Subject: ${mail.subject}`,
            'Content-Type: text/plain; charset="UTF-8"',
            '',
            mail.body,
        ];

        const message = messageParts.join('\n');
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        return encodedMessage;

    }

    async sendWithGmail(mail: Mail) {

        const { clientId, clientSecret, from, refreshToken } = this.mailConfig;
        const redirectURI = "https://developers.google.com/oauthplayground";

        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);

        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });

        const { token } = await oauth2Client.getAccessToken();

        const raw = await this.createRawEmail({
            ...mail,
            from,
        });

        const url = 'https://www.googleapis.com/gmail/v1/users/me/messages/send';

        const requestBody = {
            raw,
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const response = this.httpService.post(url, requestBody, { headers });

        return firstValueFrom(response);

    }

    async sendWithSES(mail: Mail) {

        const { host, from, accessKeyId, secretAccessKey } = this.mailConfig;

        const ses = new SES({
            apiVersion: '2010-12-01',
            region: host.split('.')[1],
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        ses.config.update({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        if (typeof mail.to === 'string') {
            mail.to = mail.to.split(';');
        }
        if (typeof mail.bcc === 'string') {
            mail.bcc = mail.bcc.split(';');
        } else if (!mail.bcc) {
            mail.bcc = [];
        }
        if (typeof mail.cc === 'string') {
            mail.cc = mail.cc.split(';');
        } else if (!mail.cc) {
            mail.cc = [];
        }
        if (typeof mail.replyTo === 'string') {
            mail.replyTo = mail.replyTo.split(';');
        } else if (!mail.replyTo) {
            mail.replyTo = [];
        }

        if (
            mail.attachments instanceof Array &&
            mail.attachments.length > 0
        ) {
            const mailContent = mimemessage.factory({
                contentType: 'multipart/mixed',
                body: [],
            });

            mailContent.header('From', from);
            mailContent.header('To', mail.to);
            mailContent.header('Subject', mail.subject);

            const alternateEntity = mimemessage.factory({
                contentType: 'multipart/alternate',
                body: [],
            });

            const htmlEntity = mimemessage.factory({
                contentType: 'text/html;charset=utf-8',
                body: mail.body,
            });

            alternateEntity.body.push(htmlEntity);

            mailContent.body.push(alternateEntity);

            await Promise.all(
                mail.attachments.map(item => {
                    const attachmentEntity = mimemessage.factory({
                        contentType: item.contentType,
                        contentTransferEncoding: 'base64',
                        body: item.content
                            .toString('base64')
                            .replace(/([^\0]{76})/g, '$1\n'),
                    });

                    attachmentEntity.header(
                        'Content-Disposition',
                        `attachment ;filename="${item.filename}"`,
                    );

                    mailContent.body.push(attachmentEntity);
                }),
            );

            return ses
                .sendRawEmail({
                    RawMessage: { Data: mailContent.toString() },
                })
                .promise();
        } else {
            const params = {
                Destination: {
                    ToAddresses: mail.to,
                    BccAddresses: mail.bcc,
                    CcAddresses: mail.cc,
                },
                Message: {
                    Body: {
                        Html: {
                            Data: mail.body,
                            Charset: 'utf-8',
                        },
                        Text: {
                            Data: mail.body,
                            Charset: 'utf-8',
                        },
                    },
                    Subject: {
                        Data: mail.subject,
                        Charset: 'utf-8',
                    },
                },
                ReplyToAddresses: mail.replyTo,
                Source: from,
                SourceArn:
                    'arn:aws:ses:us-east-1:281955153417:identity/noreply@hcode.com.br',
            };

            return ses.sendEmail(params).promise();
        }

    }

}
