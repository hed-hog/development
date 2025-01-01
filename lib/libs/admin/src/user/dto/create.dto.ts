import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsOptional()
  @IsNumber()
  multifactor_id?: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  code?: string;
}
