import {
  IsString,
  Length,
  IsInt,
  IsOptional,
  IsDateString,
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
  @IsOptional()
  birth_at?: string;
}
