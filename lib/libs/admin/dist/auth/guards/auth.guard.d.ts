import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
export declare class AuthGuard implements CanActivate {
    private auth;
    private reflector;
    constructor(auth: AuthService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
//# sourceMappingURL=auth.guard.d.ts.map