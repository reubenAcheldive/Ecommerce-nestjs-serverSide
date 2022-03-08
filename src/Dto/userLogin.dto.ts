import {
  IsEmail,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IS_EMAIL,
} from "class-validator";

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  @IsString()
  userPassword: string;
}
