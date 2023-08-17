import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { DataSource, Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const { itemsId, ...rest } = createWishlistDto;
      const items = await this.wishesService.getWishListById(itemsId);
      const owner = await this.usersService.findById(userId);

      const wishlist = await this.wishlistRepository.save({
        ...rest,
        items,
        owner,
      });

      return wishlist;
    } catch (err) {
      throw err;
    } finally {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      await queryRunner.release();
    }
  }
}
