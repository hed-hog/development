import { IsArray, IsInt } from 'class-validator';

export class UpdateIdsDTO {
  @IsInt({
    each: true,
  })
  @IsArray()
  ids: number[];
}
