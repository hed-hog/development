import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardCoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async fromSlug(slug: string, code: string) {
    return this.prismaService.dashboard_item.findMany({
      where: { dashboard: { slug } },
      include: {
        dashboard_user: true,
        dashboard_component: {
          include: {
            dashboard_component_locale: {
              where: {
                locale: {
                  code,
                },
              },
            },
          },
        },
      },
    });
  }
}
