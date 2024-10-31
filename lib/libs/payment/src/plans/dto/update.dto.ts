import { IsString, Length, IsOptional, IsInt } from 'class-validator';

export class UpdateDTO {
  @IsString()
  @Length(0, 255)
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsOptional()
  duration_id?: number;
}
