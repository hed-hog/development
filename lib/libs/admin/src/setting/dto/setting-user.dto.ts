import { IsString } from 'class-validator';

export class SettingUserDTO {
  @IsString()
  value: string;
}
