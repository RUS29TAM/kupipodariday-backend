import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get(':id')
  async getWishById(@Param('id') id: number) {
    return await this.wishesService.findById(id);
  }

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createWishDto: CreateWishDto,
  ) {
    return await this.wishesService.create(id, createWishDto);
  }
}
