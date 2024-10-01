import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonTypeDTO {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  @IsString({ message: 'Name needs to be a string.' })
  name: string;
}
