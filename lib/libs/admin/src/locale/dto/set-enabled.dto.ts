import { IsString, IsArray } from 'class-validator';

export class SetEnabledDTO {
  @IsArray()
  @IsString({
    each: true,
  })
  codes: string[];
}
