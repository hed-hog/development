import { IS_PUBLIC_KEY, WITH_ROLE } from '@hedhog/core';
import { PrismaService } from '@hedhog/prisma';
import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  RequestMethod,
  UnauthorizedException,
} from '@nestjs/common';
import { METHOD_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const withRole = this.reflector.getAllAndOverride<boolean>(WITH_ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!withRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const controller = context.getClass();
    const handler = context.getHandler();
    const controllerPath = this.reflector.get<string>('path', controller) || '';
    const methodPath = this.reflector.get<string>('path', handler) || '';

    const requestMethod = this.reflector.get<RequestMethod>(
      METHOD_METADATA,
      handler,
    );

    let fullPath = `/${controllerPath}/${methodPath}`.replace(/\/+/g, '/');

    if (fullPath.endsWith('/')) {
      fullPath = fullPath.slice(0, -1);
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const userId = (request as any)?.auth?.user?.id;

    let httpMethod: any;
    switch (requestMethod) {
      case RequestMethod.GET:
        httpMethod = 'GET';
        break;
      case RequestMethod.POST:
        httpMethod = 'POST';
        break;
      case RequestMethod.PUT:
        httpMethod = 'PUT';
        break;
      case RequestMethod.DELETE:
        httpMethod = 'DELETE';
        break;
      case RequestMethod.PATCH:
        httpMethod = 'PATCH';
        break;
      case RequestMethod.OPTIONS:
        httpMethod = 'OPTIONS';
        break;
      case RequestMethod.HEAD:
        httpMethod = 'HEAD';
        break;
      case RequestMethod.ALL:
        httpMethod = 'ALL';
        break;
    }

    console.log({ fullPath, httpMethod });

    const route = await (this.prisma as any).route.count({
      where: {
        method: httpMethod,
        url: fullPath,
        role_route: {
          some: {
            role: {
              role_user: {
                some: {
                  user_id: Number(userId),
                },
              },
            },
          },
        },
      },
    });

    return route === 1;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
