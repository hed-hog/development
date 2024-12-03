import { IsNumber, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsBoolean()
  primary?: boolean;

  @IsString()
  value: string;
}
