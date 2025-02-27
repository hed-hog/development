import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  chat_id: number;

  @IsNumber()
  person_id: number;

  @IsString()
  type: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  read_at?: string;

  @IsOptional()
  @IsString()
  received_at?: string;
}
