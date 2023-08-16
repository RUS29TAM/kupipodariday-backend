import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { HashService } from '../hash/hash.service';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userWithHash = await this.hashService.getUserWithHash(
        createUserDto,
      );
      const user = await this.usersRepository.save(userWithHash);
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ServerException(ErrorCode.UserAlreadyExists);
      }
    }
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findByUserName(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }
}
