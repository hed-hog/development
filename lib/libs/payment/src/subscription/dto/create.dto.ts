import { IsInt, IsString, Length, IsDate, IsBoolean } from 'class-validator';

export class CreateDTO {
  @IsInt()
  plan_id: number;

  @IsInt()
  person_id: number;

  @IsString()
  @Length(0, 255)
  name: string;

  @IsDate()
  start_at: Date;

  @IsDate()
  end_at: Date;

  @IsInt()
  status_id: number;

  @IsBoolean()
  recurring: boolean;
}
