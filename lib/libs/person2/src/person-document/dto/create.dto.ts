import { IsBoolean, IsString, Length, IsDate } from 'class-validator';

export class CreateDTO {
  @IsBoolean()
  primary: boolean;

  @IsString()
  @Length(0, 63)
  value: string;

  @IsDate()
  issued_at: Date;

  @IsDate()
  expiry_at: Date;
}
