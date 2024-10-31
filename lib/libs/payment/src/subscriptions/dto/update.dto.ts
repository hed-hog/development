import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class UpdateDTO {
  @IsInt()
  @IsOptional()
  plan_id?: number;

  @IsInt()
  @IsOptional()
  person_id?: number;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  name?: string;

  @IsDate()
  @IsOptional()
  start_at?: Date;

  @IsDate()
  @IsOptional()
  end_at?: Date;

  @IsInt()
  @IsOptional()
  status_id?: number;

  @IsBoolean()
  @IsOptional()
  recurring?: boolean;
}
