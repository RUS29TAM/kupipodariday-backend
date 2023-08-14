import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(64)
  @MinLength(1)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(2)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  about?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}
