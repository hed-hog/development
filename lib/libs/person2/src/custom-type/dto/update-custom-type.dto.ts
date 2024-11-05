import { IsOptional, IsString } from 'class-validator';

export class UpdateCustomTypeDTO {
  @IsOptional()
  @IsString({ message: 'Name needs to be a string.' })
  name?: string;
}
