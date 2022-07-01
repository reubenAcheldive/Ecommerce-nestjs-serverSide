import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { IProduct} from "src/Dto/products/products.dto";
import {CategorySchema} from "../CatagoriesAndCities/categories.schema"
export type ProductDocument = Products & Document;
@Schema()
export class Products  implements IProduct{
 
  _id?: string;
 @Prop({ type: String })
  name: string;
  @Prop({ type: String})  
  categoryRef: string;
  @Prop({ type: Number })
  price: number;
  @Prop({ type: String })
  imgUrl: string;
  @Prop({ type: String })
  description: string;
}
export const ProudctsSchema = SchemaFactory.createForClass(Products)