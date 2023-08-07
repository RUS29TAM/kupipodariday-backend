import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  create(createWishlistDto: CreateWishlistDto) {
    return 'Это действие добавляет новый список желаний';
  }

  findAll() {
    return `Это действие возвращает все списки желаний`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `Это действие возвращает список #${id} желаний`;
  }

  remove(id: number) {
    return `Это действие удаляет список #${id} желаний`;
  }
}
