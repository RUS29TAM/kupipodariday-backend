import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entities/wish.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
  ) {}
  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...rest } = await this.usersService.findById(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: rest });
  }

  async findById(id: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    return wish;
  }
}
