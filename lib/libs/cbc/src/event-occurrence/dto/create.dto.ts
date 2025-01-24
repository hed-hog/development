import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  event_id: number;

  @IsString()
  event_at: string;
}
