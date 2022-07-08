import { IsNumber, IsString } from "class-validator";

export class IAddressValidator {
  @IsString() customerRef: String;
  @IsString() city: String;
  @IsString() streetAddress: String;
  @IsNumber() entering: Number;
  @IsNumber() homeNumber: Number;
  @IsNumber() departmentNumber: Number;
}
