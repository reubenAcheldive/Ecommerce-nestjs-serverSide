import { IsNumber, IsString } from "class-validator";

export class IAddressValidator {
  @IsString() _id?:string
  @IsString() customerRef: string;
  @IsString() city: string;
  @IsString() streetAddress: string;
  @IsNumber() entering: number;
  @IsNumber() homeNumber: number;
  @IsNumber() departmentNumber: number;
}
