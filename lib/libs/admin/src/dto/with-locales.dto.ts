import { IsObject, IsOptional, ValidateNested } from 'class-validator';

export class WithLocalesDTO {
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  locales: Record<string, string>;
}
