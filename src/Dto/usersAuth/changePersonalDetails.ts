import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
} from "class-validator";


export class ChangePersonalDetails {
  @IsString() _id: String;

  @IsString() lastName: String;
  @IsString() firstName: String;
}
