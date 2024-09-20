import {
  CanActivate,
  ExecutionContext,
  Injectable,
  RequestMethod,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { METHOD_METADATA } from '@nestjs/common/constants';
import { WITH_PERMISSION } from '../decorators/permission.decorator';
import { PrismaService } from '@hedhog/prisma';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const withPermission = this.reflector.getAllAndOverride<boolean>(
      WITH_PERMISSION,
      [context.getHandler(), context.getClass()],
    );

    if (!withPermission) {
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

    const fullPath = `/${controllerPath}/${methodPath}`.replace(/\/+/g, '/');

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

    const route = await this.prisma.routes.count({
      where: {
        method: httpMethod,
        url: fullPath,
        role_routes: {
          some: {
            roles: {
              role_users: {
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