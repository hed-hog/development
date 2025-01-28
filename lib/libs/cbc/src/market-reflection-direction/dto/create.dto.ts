import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  direction: string;
}
