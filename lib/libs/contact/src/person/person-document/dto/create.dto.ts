import { IsInt, IsBoolean, IsString, Length, IsDate } from 'class-validator';

export class CreateDTO {
  @IsInt()
  person_id: number;

  @IsInt()
  type_id: number;

  @IsInt()
  country_id: number;

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
