import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SigninUserRespDto } from './dto/signin-user-resp.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto): Promise<string> {
    return 'signin';
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SigninUserRespDto> {
    return; //await this.authService.create(createAuthDto);
  }
  //
  // @Get()
  // async findAll(): Promise<Auth[]> {
  //   return await this.authService.findAll();
  // }
  //
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Auth> {
  //   return await this.authService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateAuthDto: UpdateAuthDto,
  // ): Promise<Auth> {
  //   return await this.authService.update(+id, updateAuthDto);
  // }
  //
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.authService.remove(+id);
  // }
}
