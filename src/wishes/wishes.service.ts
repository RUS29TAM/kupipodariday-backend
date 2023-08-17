import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entities/wish.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/errors';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(ownerId: number, createWishDto: CreateWishDto) {
    const { password, ...rest } = await this.usersService.findById(ownerId);
    return await this.wishRepository.save({ ...createWishDto, owner: rest });
  }

  async update(id: number, updateData: any) {
    await this.wishRepository.update(id, updateData);
  }

  async getWishListById(ids: number[]): Promise<Wish[]> {
    const wishes = await this.wishRepository
      .createQueryBuilder('item')
      .where('item.id IN (:...ids)', { ids })
      .getMany();

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
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
      relations: ['owner', 'offers', 'offers.user'],
    });
    return wish;
  }

  async delete(userId: number, wishId: number) {
    const wish = await this.findById(wishId);
    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.Forbidden);
    }
    return await this.wishRepository.delete(wishId);
  }

  async copy(userId: number, wishId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const { id, createdAt, updatedAt, owner, ...wish } = await this.findById(
        wishId,
      );
      const copiedWish = await this.create(userId, wish);

      await this.wishRepository.update(wishId, {
        copied: copiedWish.copied + 1,
      });

      await queryRunner.commitTransaction();

      return copiedWish;
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err; // Пробросим ошибку дальше для обработки на вышестоящем уровне
    } finally {
      await queryRunner.release();
    }
  }
}
