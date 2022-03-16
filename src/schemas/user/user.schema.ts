/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({type: Number,unique: true})
  id:number
  @Prop({ type: String })
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  isAdmin?: boolean ;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
