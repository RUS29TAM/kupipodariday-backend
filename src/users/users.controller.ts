import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserProfileRespDto } from '../auth/dto/user-profile-resp.dto';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me')
  @UseInterceptors(PasswordUserInterceptor)
  async findCurrentUser(
    @Request() { user: { id } },
  ): Promise<UserProfileRespDto> {
    return await this.usersService.findById(id);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me/wishes')
  async findCurrentUserWishes(@Request() { user: { id } }) {
    return this.usersService.findWishes(id);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get(':username')
  async findUser(@Param('username') username: string) {
    return this.usersService.findByUserName(username);
  }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @UseInterceptors(PasswordUserInterceptor)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByUserName(username);
    return await this.usersService.findWishes(id);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  //
  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  @UseInterceptors(PasswordUserInterceptor)
  async updateCurrentUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileRespDto> {
    return await this.usersService.update(id, updateUserDto);
  }
}
