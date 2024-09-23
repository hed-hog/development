import { IsArray, IsInt } from 'class-validator';

export class UpdateRolesDTO {
  @IsInt({
    each: true,
  })
  @IsArray()
  ids: number[];
}
