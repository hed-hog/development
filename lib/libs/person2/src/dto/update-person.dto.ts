import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';

export class UpdatePersonDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  type_id: number;

  @IsOptional()
  @IsDateString()
  birth_date?: Date;
}
