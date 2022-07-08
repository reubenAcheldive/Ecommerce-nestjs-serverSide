import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
} from "class-validator";
import changePersonalDetails from "./../../../dist/Dto/usersAuth/changePersonalDetaiels.d";

export class ChangePersonalDetails {
  @IsString() _id: String;

  @IsString() lastName: String;
  @IsString() firstName: String;
}
