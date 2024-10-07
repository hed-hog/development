import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreatePersonDTO {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  @IsString({ message: 'Name needs to be a string.' })
  name: string;

  @IsNotEmpty({ message: 'TypeID is mandatory.' })
  @IsInt({ message: 'TypeID must be an integer number.' })
  type_id: number;

  @IsOptional()
  @IsDateString()
  birth_at?: Date;
}
