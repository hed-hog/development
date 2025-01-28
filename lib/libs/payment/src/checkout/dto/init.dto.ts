import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class InitDTO {
  @IsString()
  slug: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  items: number[];

  @IsOptional()
  @IsInt()
  couponId?: number;
}
