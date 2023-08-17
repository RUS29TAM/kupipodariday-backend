import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Repository } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return await this.wishlistsService.create(id, createWishlistDto);
  }
}
