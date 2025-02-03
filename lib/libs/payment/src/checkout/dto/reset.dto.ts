import { IsString } from 'class-validator';

export class ResetDTO {
  @IsString()
  slug: string;
}
