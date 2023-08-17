import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Offer } from '../entities/offer.entity';
import { Wish } from '../entities/wish.entity';
import { Wishlist } from '../entities/wishlist.entity';
import { UsersModule } from '../users/users.module';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Offer, Wish, Wishlist]),
    UsersModule,
    WishesModule,
  ],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
