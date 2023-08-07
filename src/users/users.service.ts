import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'Это действие добавляет нового пользователя';
  }

  findAll() {
    return `Это действие возвращает всех пользователей`;
  }

  findOne(id: number) {
    return `Это действие возвращает #${id} пользователя`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `Это действие обновляет #${id} пользователя`;
  }

  remove(id: number) {
    return `Это действие удаляет #${id} пользователя`;
  }
}
