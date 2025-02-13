import { IsString } from 'class-validator';

export class ResetDTO {
  @IsString({ message: 'O slug deve ser um texto.' })
  slug: string;
}
