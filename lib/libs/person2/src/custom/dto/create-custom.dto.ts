import { IsInt, IsString } from 'class-validator';

export class CreatePersonCustomDTO {
  @IsInt({ message: 'TypeID must be an integer number. ' })
  type_id: number;

  @IsString({ message: 'Name must be a string. ' })
  name: string;

  @IsString({ message: 'Value must be a string. ' })
  value: string;
}
