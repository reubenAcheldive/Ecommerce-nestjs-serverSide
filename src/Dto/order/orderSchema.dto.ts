import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsDateString,
  IsNumberString,
} from "class-validator";
import { PaymentSchemaDto } from "../payment/payment.dto";

export class OrderSchemaDto {
  @IsString()
  cartRef: string;
  @IsString()
  customerRef: string;
  @IsDateString()
  DateDelivery: Date;
  @IsNumberString()
  @IsOptional()
  TotalPrice: number;
  @IsDate()
  @IsOptional()
  DateOfCreateOrder?: Date;
  @IsString()
  address: string;
  @IsString()
  cityDelivery: string;
  @IsString()
  paymentId: string;
}
