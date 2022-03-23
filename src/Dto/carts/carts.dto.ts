import { IsArray, IsNumber, IsString } from "class-validator";

export class ICart {
  @IsNumber()
  date: number;
  @IsString()
  customerRef: string;
@IsNumber()
status: number;
  _id?: any;
  @IsArray()
  cartItems: [
    {
      quantity: Number;
      products: String;
    }
  ];
}
