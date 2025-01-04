import { IsString } from 'class-validator';

export class CreateDTO {
  @IsString()
  btc_dominance: string;
}
