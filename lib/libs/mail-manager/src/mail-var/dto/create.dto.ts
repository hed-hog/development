import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  mail_id: number;

  @IsString()
  name: string;
}
