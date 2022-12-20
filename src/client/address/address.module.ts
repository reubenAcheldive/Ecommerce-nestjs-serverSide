import { Module } from "@nestjs/common";
import { DbAddressModule } from "src/database/db-address/db-address.module";

 
import { AddressController } from "./controller/address.controller";
import { AddressService } from "./services/address.service";

@Module({
  imports: [DbAddressModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}

 