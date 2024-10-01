import { IsOptional, IsString, IsDate, IsInt } from 'class-validator';

export class UpdatePersonDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  type_id: number;

  @IsOptional()
  @IsDate()
  birth_date?: Date;
}
