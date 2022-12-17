import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Address, AddressSchema } from "src/schemas/address/Address";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
})
export class DbAddressModule {}
