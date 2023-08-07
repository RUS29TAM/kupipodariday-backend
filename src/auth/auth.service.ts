import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

interface Auth {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly auths: Auth[] = [];

  create(createAuthDto: CreateAuthDto): Auth {
    const auth: { id: number } = {
      id: this.auths.length + 1,
      ...createAuthDto,
    };
    this.auths.push(<Auth>auth);
    return <Auth>auth;
  }

  findAll(): Auth[] {
    return this.auths;
  }

  findOne(id: number): Auth {
    const auth = this.auths.find((auth) => auth.id === id);
    if (!auth) {
      throw new Error(`Auth with ID ${id} not found`);
    }
    return auth;
  }

  update(id: number, updateAuthDto: UpdateAuthDto): Auth {
    const auth = this.findOne(id);
    Object.assign(auth, updateAuthDto);
    return auth;
  }

  remove(id: number): void {
    const index = this.auths.findIndex((auth) => auth.id === id);
    if (index === -1) {
      throw new Error(`Auth with ID ${id} not found`);
    }
    this.auths.splice(index, 1);
  }
}
