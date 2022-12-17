import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsDateString,
  IsNumberString,
  MaxLength,
  MinLength,
  IsCreditCard,
  IsEmpty,
} from "class-validator";

export class PaymentSchemaDto {
  @IsOptional()
  _id: string;
  @IsString()
  customerRef: string;
  @IsString()
  cartRef: string;
  @MaxLength(16)
  @MinLength(16)
  cardNumber: string;
  @MaxLength(4)
  @MinLength(4)
  cvc: string;
  @IsString()
  name: string;
  @MinLength(4)
  @MaxLength(4)
  expiredDate: string;
}
