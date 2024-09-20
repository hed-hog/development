import { ArrayMinSize, ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class DeleteDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  ids: number[];
}
