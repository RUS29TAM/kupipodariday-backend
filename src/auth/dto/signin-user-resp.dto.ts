import { IsString, IsNotEmpty } from 'class-validator';

export class SigninUserRespDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
