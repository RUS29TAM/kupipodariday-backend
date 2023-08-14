import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(CreateUserDto) {}
