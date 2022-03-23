import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateCartList {
    @IsString()
  cartId: string;
  @IsString()
  productRefId: string;
  @IsNumber()
  quantity: number;
}
