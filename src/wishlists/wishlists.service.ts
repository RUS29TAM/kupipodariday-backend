import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  create(createWishlistDto: CreateWishlistDto) {
    return 'Это действие добавляет новый список желаний';
  }
}
