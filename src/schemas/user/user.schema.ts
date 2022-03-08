/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ type: String })
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  isAdmin: boolean;
  @Prop()
  city: string;
  @Prop()
  address: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
