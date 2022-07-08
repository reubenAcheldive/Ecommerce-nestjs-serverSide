import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IAddressValidator } from "src/Dto/address/address.dto";

export type AddressDocuments = Address & Document;

@Schema()
export class Address implements IAddressValidator {
  @Prop({ type: String })
  customerRef: String;
  @Prop({ type: String })
  city: String;
  @Prop({ type: String })
  streetAddress: String;
  @Prop({ type: Number })
  entering: Number;
  @Prop({ type: Number })
  homeNumber: Number;
  @Prop({ type: Number })
  departmentNumber: Number;
}
export const AddressSchema = SchemaFactory.createForClass(Address)