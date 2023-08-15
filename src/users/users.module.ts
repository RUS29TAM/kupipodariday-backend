import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Offer } from '../entities/offer.entity';
import { Wish } from '../entities/wish.entity';
import { Wishlist } from '../entities/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Offer, Wish, Wishlist])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
