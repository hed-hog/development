import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateDTO {
  @IsString()
  slug: string;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  locales: Record<string, string>;
}
