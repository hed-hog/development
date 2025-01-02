import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateDTO {
  @IsString({ message: 'The name must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'The email must be a valid email' })
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    },
    {
      message:
        'The password must be at least 6 characters long and contain at least one lowercase',
    },
  )
  password?: string;

  @IsOptional()
  @IsInt({ message: 'The multifactor_id must be an integer' })
  multifactor_id?: number;

  @IsOptional()
  @IsString({ message: 'The code must be a string' })
  code?: string;
}
