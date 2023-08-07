import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  create(createOfferDto: CreateOfferDto) {
    return 'Это действие добавляет новое предложение';
  }

  findAll() {
    return `Это действие возвращает все предложения`;
  }

  findOne(id: number) {
    return `Это действие возвращает #${id} предложение`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `Это действие обновляет #${id} предложение`;
  }

  remove(id: number) {
    return `Это действие удаляет #${id} предложение`;
  }
}
