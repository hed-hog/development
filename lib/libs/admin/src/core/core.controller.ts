import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('core')
export class CoreController {
  constructor(
    @Inject(forwardRef(() => CoreService))
    private readonly service: CoreService,
  ) {}

  @Get()
  async index() {
    return this.service.index();
  }
}
