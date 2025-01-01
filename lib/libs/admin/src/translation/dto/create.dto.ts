import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  locale_id: number;

  @IsNumber()
  namespace_id: number;

  @IsString()
  name: string;

  @IsString()
  value: string;
}
