import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdatePersonCustomDTO {
  @IsOptional()
  @IsInt({ message: 'TypeID must be an integer number. ' })
  type_id?: number;

  @IsOptional()
  @IsString({ message: 'Name must be a string. ' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Value must be a string. ' })
  value?: string;
}
