import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class PutMethodDTO {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  methodId: number;
}
