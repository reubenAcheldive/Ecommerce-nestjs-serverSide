import { ArrayContains, IsArray, IsNumber, IsString } from "class-validator";
import { isArrayBuffer } from "util/types";

export class UpdateCartList {
  @IsString()
  cartId: string;
  @ArrayContains([])
  items: [
    {
      productRefId: string;
      quantity: number;
    }
  ];
}

export class updateOneItemInCartItems {
  @IsString()
  idCart: string;
  @IsNumber()
  quantity: number;
  @IsString()
  productRefId: string;
}
