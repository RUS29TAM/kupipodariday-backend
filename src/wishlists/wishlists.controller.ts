import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request, UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Repository } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';
import { PasswordWishInterceptor } from '../interceptors/password-wish.interceptor';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseInterceptors(PasswordWishInterceptor)
  @Get()
  async getAll(): Promise<Wishlist[]> {
    return await this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return await this.wishlistsService.create(id, createWishlistDto);
  }
}
