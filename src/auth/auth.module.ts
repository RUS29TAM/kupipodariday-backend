import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../hash/hash.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    HashModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalGuard, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
