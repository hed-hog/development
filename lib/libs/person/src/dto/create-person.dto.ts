import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreatePersonDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  person_type: string;

  @IsOptional()
  @IsDate()
  birth_date?: Date;
}
