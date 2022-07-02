import {
  IsEmail,
  IsString,
  IsEmpty,
  IsNotEmpty,
  IS_EMAIL,
  IsNumber,
  IsNumberString,
  IsBoolean,
  IsOptional,
} from "class-validator";

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
export class UserUpdate {
  @IsString()
  _id: string;
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
