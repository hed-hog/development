import { IsObject, IsOptional, ValidateNested } from 'class-validator';

export class WithLocaleDTO {
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  locale: Record<string, string>;
}
