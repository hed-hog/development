import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsString()
  headers: string;

  @IsString()
  filters: string;
}
