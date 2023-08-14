import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 64)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(2)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Length(1, 200)
  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
