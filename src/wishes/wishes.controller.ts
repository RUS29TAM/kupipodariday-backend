import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PasswordWishInterceptor } from '../interceptors/password-wish.interceptor';

@UseGuards(JwtGuard)
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Get('last')
  async getLastWish() {
    return await this.wishesService.findLast();
  }

  @Get('top')
  async getTopWish() {
    return await this.wishesService.findTop();
  }

  @UseInterceptors(PasswordWishInterceptor)
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

  @Delete(':id')
  async delete(@Request() { user: { id } }, @Param('id') wishId: number) {
    return await this.wishesService.delete(id, wishId);
  }
}
