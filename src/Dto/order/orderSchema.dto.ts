import { IsString, IsNumber, IsDate, IsOptional, IsDateString } from "class-validator";

export class OrderSchemaDto {
  @IsString()
  cartRef: string;
  @IsString()
  customerRef: string;
  @IsDateString()
  DateDelivery: Date;
  @IsNumber()
  TotalPrice: number;
  @IsDate()
  @IsOptional()
  DateOfCreateOrder?: Date;
  @IsString()
  address: string;
  @IsString()
  cityDelivery: string;
  @IsNumber()
  fourDigitCreditCard: number;
}
