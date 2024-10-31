import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateDTO {
  @IsString()
  @Length(0, 255)
  @IsOptional()
  slug?: string;
}
