import { IsObject, IsOptional, ValidateNested } from 'class-validator';

export class UpdateLocalesDTO {
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  locales: Record<string, string>;
}
