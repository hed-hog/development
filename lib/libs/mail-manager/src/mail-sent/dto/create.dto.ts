import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  mail_id: number;

  @IsString()
  subject: string;

  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  cc?: string;

  @IsOptional()
  @IsString()
  bcc?: string;

  @IsString()
  body: string;
}
