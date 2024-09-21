import { AuthService } from './auth.service';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { User as UserType } from './types/user.type';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    verify({ id }: UserType): Promise<any>;
    login({ email, password }: LoginDTO): Promise<{
        token: string;
    } | {
        token: string;
        mfa: boolean;
    }>;
    otp({ token, code }: OtpDTO): Promise<{
        token: string;
    }>;
    forget({ email }: ForgetDTO): Promise<boolean>;
}
//# sourceMappingURL=auth.controller.d.ts.map