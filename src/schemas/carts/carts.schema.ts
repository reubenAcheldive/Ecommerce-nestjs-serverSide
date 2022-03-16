import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
export type CartDucument = Carts & Document;
@Schema()
export class Carts {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "users" })
  customerRef: string;
  @Prop()
  date: number;
}

export const CartSchema = SchemaFactory.createForClass(Carts)