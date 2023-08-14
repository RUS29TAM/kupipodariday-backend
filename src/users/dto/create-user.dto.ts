import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(2)
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(1, 200)
  @IsOptional()
  about?: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;
}
