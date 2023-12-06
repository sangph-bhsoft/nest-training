import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginVM } from './models/login-vm.model';
import { LoginResponseVm } from './models/login-response-vm.model';
import { RegisterVm } from './models/register-vm.model';
import { UserVm } from '@modules/user/models/user-vm.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async register(payload: RegisterVm): Promise<UserVm> {
    try {
      const { email, password, phone, username } = payload;
      const salt = await genSalt(10);

      const hashPassword = await hash(password, salt);
      const userCreate = this.userRepository.create();
      userCreate.username = username;
      userCreate.email = email;
      userCreate.phone = phone;
      userCreate.password = hashPassword;
      const user = await this.userRepository.save(userCreate);
      return await this.mapper.map(user, UserEntity, UserVm);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Code nhu cc');
    }
  }

  async login(payload: LoginVM): Promise<LoginResponseVm> {
    try {
      const { password, username } = payload;
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user) throw new NotFoundException('User not found');
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) throw new UnauthorizedException('Invalid password');
      return {
        token: this.jwtService.sign({ userId: user.id }),
      };
    } catch (error) {
      throw error;
    }
  }
}
