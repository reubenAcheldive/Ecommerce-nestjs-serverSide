import {
  IsEmail,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IS_EMAIL,
  IsNumber,
  IsNumberString,
} from "class-validator";

export class UserLoginDto {
  @IsEmail()
  userEmail: string;
  @IsNotEmpty()
  @IsString()
  userPassword: string;
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
  @IsString()
  city: string;
  @IsString()
  address: string;
}
