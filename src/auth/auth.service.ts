import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/errors';

// interface Auth {
//   id: number;
//   username: string;
//   password: string;
// }

@Injectable()
export class AuthService {
  private bcrypt: any;
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {
    this.bcrypt = require('bcrypt');
  }

  async auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    try {
      const user = await this.userService.findByUserName(username);

      if (user) {
        const isPasswordValid = await this.bcrypt.compare(
          password,
          user.password,
        );

        if (isPasswordValid) {
          return { id: user.id, username: user.username };
        }
      }

      return null;
    } catch (error) {
      console.error('Ошибка валидации пароля:', error);
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }
  }
}

// @Injectable()
// export class AuthService {
//   private readonly auths: Auth[] = [];
//
//   create(createAuthDto: CreateUserDto): Auth {
//     const auth: { id: number } = {
//       id: this.auths.length + 1,
//       ...createAuthDto,
//     };
//     this.auths.push(<Auth>auth);
//     return <Auth>auth;
//   }
//
//   findAll(): Auth[] {
//     return this.auths;
//   }
//
//   findOne(id: number): Auth {
//     const auth = this.auths.find((auth) => auth.id === id);
//     if (!auth) {
//       throw new Error(`Auth with ID ${id} not found`);
//     }
//     return auth;
//   }
//
//   update(id: number, updateAuthDto: UpdateAuthDto): Auth {
//     const auth = this.findOne(id);
//     Object.assign(auth, updateAuthDto);
//     return auth;
//   }
//
//   remove(id: number): void {
//     const index = this.auths.findIndex((auth) => auth.id === id);
//     if (index === -1) {
//       throw new Error(`Auth with ID ${id} not found`);
//     }
//     this.auths.splice(index, 1);
//   }
// }
