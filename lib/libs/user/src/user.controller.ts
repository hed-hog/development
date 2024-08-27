import { AuthGuard } from '@hedhog/auth/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUser() {
    this.userService.getUser();
  }
}
