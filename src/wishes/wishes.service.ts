import {Injectable} from '@nestjs/common';
import {CreateWishDto} from './dto/create-wish.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Wish} from '../entities/wish.entity';
import {Repository} from 'typeorm';
import {UsersService} from '../users/users.service';
import {ServerException} from "../exceptions/server.exception";
import {ErrorCode} from "../exceptions/errors";

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

  async findLast() {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });
    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
  }

  async findTop() {
    const wishes = await this.wishRepository.find({
      order: { copied: 'desc' },
      take: 20,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
  }

  async findById(id: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    return wish;
  }
}
