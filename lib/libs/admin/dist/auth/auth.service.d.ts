import { PrismaService } from '@hedhog/prisma';
import { JwtService } from '@nestjs/jwt';
import { ForgetDTO } from './dto/forget.dto';
import { LoginDTO } from './dto/login.dto';
import { OtpDTO } from './dto/otp.dto';
import { MailService } from '@hedhog/mail';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly mail;
    constructor(prisma: PrismaService, jwt: JwtService, mail: MailService);
    verifyToken(token: string): Promise<any>;
    generateRandomString(length: number): string;
    generateRandomNumber(): number;
    loginWithEmailAndPassword(email: string, password: string): Promise<{
        token: string;
    } | {
        token: string;
        mfa: boolean;
    }>;
    getToken(user: any): Promise<{
        token: string;
    }>;
    forget({ email }: ForgetDTO): Promise<boolean>;
    otp({ token, code }: OtpDTO): Promise<{
        token: string;
    }>;
    login({ email, password }: LoginDTO): Promise<{
        token: string;
    } | {
        token: string;
        mfa: boolean;
    }>;
    verify(id: number): any;
}
//# sourceMappingURL=auth.service.d.ts.map