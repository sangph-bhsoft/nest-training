import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterVm } from './models/register-vm.model';
import { LoginVM } from './models/login-vm.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() payload: RegisterVm) {
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginVM) {
    return this.authService.login(payload);
  }
}
