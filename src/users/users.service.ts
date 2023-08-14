import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // findAll() {
  //   return `Это действие возвращает всех пользователей`;
  // }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findeByUserName(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `Это действие обновляет #${id} пользователя`;
  // }

  remove(id: number) {
    return `Это действие удаляет #${id} пользователя`;
  }
}
