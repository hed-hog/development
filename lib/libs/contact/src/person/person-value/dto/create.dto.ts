import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  value: string;
}
