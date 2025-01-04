import { IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cookies?: string;
}
