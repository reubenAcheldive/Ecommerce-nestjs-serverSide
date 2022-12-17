import { IsEmail, IsString, IsNotEmpty, IsNumberString } from "class-validator";

export class UserAuthLogin {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserRegister {
  @IsNumberString()
  id: number;
  @IsEmail()
  email: string;
  @IsNumberString()
  password: string;
  @IsNumberString()
  confirmPassword: string;
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
