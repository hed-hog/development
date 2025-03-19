import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  component_id: number;

  @IsString()
  name: string;

  @IsNumber()
  parent_id: number;

  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  visibility?: string;
}
