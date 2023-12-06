import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserVm } from './models/user-vm.model';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@modules/auth/models/role.enum';
import { Roles } from '@modules/auth/guards/role.decorator';
import { RolesGuard } from '@modules/auth/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //get all users
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @ApiTags('Protected')
  @ApiBearerAuth('token')
  async findAll(): Promise<UserVm[]> {
    return this.userService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiTags('Protected')
  @ApiBearerAuth('token')
  async create(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<any> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle error if user does not exist
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}
