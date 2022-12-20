import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IAddressValidator } from "src/dtos/address/address.dto";

export type AddressDocuments = Address & Document;

@Schema()
export class Address implements IAddressValidator {
  @Prop({ type: mongoose.Types.ObjectId })
  @Prop({ type: String })
  customerRef: string;
  @Prop({ type: String })
  city: string;
  @Prop({ type: String })
  streetAddress: string;
  @Prop({ type: Number })
  entering: number;
  @Prop({ type: Number })
  homeNumber: number;
  @Prop({ type: Number })
  departmentNumber: number;
  @Prop({ type: Boolean, default: true })
  default: boolean;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
