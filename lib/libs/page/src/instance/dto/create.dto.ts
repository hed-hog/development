import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  component_id: number;

  @IsString()
  name: string;

  @IsNumber()
  parent_id: number;

  @IsString()
  order: string;

  @IsOptional()
  @IsString()
  visibility?: string;
}
