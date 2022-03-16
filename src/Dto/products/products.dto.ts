import { IsString, IsNumber } from "class-validator";

export class IProduct {
  @IsString()
  name: string;
  @IsString()
  categoryRef: string;
  @IsNumber()
  price: number;
  @IsString()
  imgUrl: string;
  @IsString()
  description: string;
}
