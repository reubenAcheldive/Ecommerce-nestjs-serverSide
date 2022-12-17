import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
 
import { Address, AddressSchema } from "../../schemas/address/Address";
import { AddressController } from "./controller/address.controller";
import { AddressService } from "./services/address.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
