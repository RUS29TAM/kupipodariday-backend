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
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SigninUserRespDto } from './dto/signin-user-resp.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UsersService } from '../users/users.service';
import { SignupUserRespDto } from './dto/signup-user-resp.dto';
import { LocalGuard } from './guards/local.guard';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';

@UseFilters(InvalidDataExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Request() { user }): Promise<SigninUserRespDto> {
    return this.authService.auth(user);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserRespDto> {
    return await this.usersService.create(createUserDto);
  }
}
