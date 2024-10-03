import { IsInt, IsBoolean, IsString } from 'class-validator';

export class CreatePersonContactDTO {
  @IsInt({ message: 'TypeID must be an integer number. ' })
  type_id: number;

  @IsBoolean({ message: 'Primary must be a boolean. ' })
  primary: boolean = false;

  @IsString({ message: 'Value must be a string. ' })
  value: string;
}
