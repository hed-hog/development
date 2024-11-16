import { IsInt, IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsInt()
  property_id: number;

  @IsInt()
  instance_id: number;

  @IsString()
  @Length(0, 255)
  value: string;
}
