import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  create(createWishDto: CreateWishDto) {
    return 'Это действие добавляет новое желание';
  }

  findAll() {
    return `Это действие возвращает все пожелания`;
  }

  findOne(id: number) {
    return `Это действие возвращает #${id} пожелания`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `Это действие обновляет #${id} пожелание`;
  }

  remove(id: number) {
    return `Это действие удаляет #${id} пожелание`;
  }
}
