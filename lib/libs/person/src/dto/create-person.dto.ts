import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsInt,
} from 'class-validator';

export class CreatePersonDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  type_id: number;

  @IsOptional()
  @IsDate()
  birth_at?: Date;
}
