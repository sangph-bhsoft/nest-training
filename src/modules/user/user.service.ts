import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserVm } from './models/user-vm.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  async findAll(): Promise<UserVm[]> {
    const users = await this.userRepository.find();
    return this.mapper.mapArray(users, UserEntity, UserVm);
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
