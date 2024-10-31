import { IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsString()
  @Length(0, 255)
  slug: string;
}
