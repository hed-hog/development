import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsNumber()
  user_id: number;
}
