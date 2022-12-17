import { IsString, IsNumber, IsOptional } from "class-validator";

export class IProduct {
  // @IsOptional()
  _id?: string;
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
  @IsOptional()
  quantity?: number;
}
