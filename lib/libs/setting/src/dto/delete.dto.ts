import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNumber,
} from 'class-validator';

export class DeleteDTO {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  ids: number[];
}
