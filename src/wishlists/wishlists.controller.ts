import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Repository } from 'typeorm';
import { Wishlist } from '../entities/wishlist.entity';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(
    private wishlistRepository: Repository<Wishlist>,
    private readonly wishlistsService: WishlistsService,
  ) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }
}
