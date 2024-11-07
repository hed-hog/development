import { IsInt, IsBoolean, IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsInt()
  person_id: number;

  @IsInt()
  type_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  @Length(0, 255)
  value: string;
}
