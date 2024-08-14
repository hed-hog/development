import { MailConfigurationTypeEnum } from "../enums/mail-configuration-type.enum";

export interface MailModuleOptions {
    global?: boolean;
    mailConfigurationType: MailConfigurationTypeEnum;
    host?: string;
    from?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
}