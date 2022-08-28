import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAddressValidator } from "src/Dto/address/address.dto";

export type AddressDocuments = Address & Document;

@Schema()
export class Address implements IAddressValidator {
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
}
export const AddressSchema = SchemaFactory.createForClass(Address)