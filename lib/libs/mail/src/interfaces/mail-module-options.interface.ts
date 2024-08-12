import { MailConfigurationTypeEnum } from "../enums/mail-configuration-type.enum";

export interface MailModuleOptions {
    global?: boolean;
    mailConfigurationType: MailConfigurationTypeEnum;
}