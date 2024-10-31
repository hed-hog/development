import { IsString, Length, IsInt } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  slug: string;

  @IsInt()
  duration_id: number;
}
