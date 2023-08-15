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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() createUserDto: CreateUserDto): Promise<Auth> {
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
