import { IsInt, IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsInt()
  person_id: number;

  @IsString()
  @Length(0, 255)
  value: string;
}
