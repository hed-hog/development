import { IsEnum, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  person_id: number;

  @IsEnum(['admin', 'user'])
  role: string;
}
