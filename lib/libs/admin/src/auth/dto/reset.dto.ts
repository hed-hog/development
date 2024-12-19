import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetDTO {
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;

    @IsNotEmpty()
    @MinLength(8)
    confirmNewPassword: string;

    @IsNotEmpty()
    code: string;
}
