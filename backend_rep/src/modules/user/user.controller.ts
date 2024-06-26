import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { RESPONSE_MESSAGES, ROLE_PERMISSIONS } from 'src/common/constants';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../auth/permission.guard';
import { Permission } from '../auth/permission.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(PermissionGuard)
  @Permission(ROLE_PERMISSIONS.READ)
  @Get()
  async getAll(@Res() res: Response) {
    try {
      const { data, err } = await this.userService.getAll();
      if (err) {
        return res.status(500).json({
          message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
        });
      }
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({
        message: err.message ? err.message : RESPONSE_MESSAGES.ERROR_UNKNOW,
      });
    }
  }
}
