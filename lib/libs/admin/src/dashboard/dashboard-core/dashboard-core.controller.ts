import { Locale } from '@hedhog/locale';
import { Controller, Get, Param } from '@nestjs/common';
import { DashboardCoreService } from './dashboard-core.service';

@Controller('dashboard-core')
export class DashboardCoreController {
  constructor(private readonly dashboardCoreService: DashboardCoreService) {}

  @Get(':slug')
  fromSlug(@Param('slug') slug: string, @Locale() locale) {
    return this.dashboardCoreService.fromSlug(slug, locale);
  }
}
