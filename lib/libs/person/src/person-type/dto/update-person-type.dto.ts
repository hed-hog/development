import { IsOptional, IsString } from 'class-validator';

export class UpdatePersonTypeDTO {
  @IsOptional()
  @IsString({ message: 'Name needs to be a string.' })
  name?: string;
}
