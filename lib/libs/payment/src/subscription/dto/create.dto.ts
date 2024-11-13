import { IsDate, IsString, IsBoolean } from 'class-validator';

export class CreateDTO {
  @IsDate()
  start_at: Date;

  @IsDate()
  end_at: Date;

  @IsString()
  status: string;

  @IsBoolean()
  recurring: boolean;
}
