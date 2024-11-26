import {
  IsString,
  Length,
  IsInt,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  name: string;

  @IsInt()
  @IsOptional()
  photo_id?: number;

  @IsInt()
  type_id: number;

  @IsDateString()
  birth_at: string;
}
