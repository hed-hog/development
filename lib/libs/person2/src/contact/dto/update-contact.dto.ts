import { IsInt, IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdatePersonContactDTO {
  @IsOptional()
  @IsInt()
  type_id?: number;

  @IsOptional()
  @IsBoolean()
  primary?: boolean = false;

  @IsOptional()
  @IsString()
  value?: string;
}
