import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdatePersonDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  person_type?: string;

  @IsOptional()
  @IsDate()
  birth_date?: Date;
}
