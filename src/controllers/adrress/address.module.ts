import { Module } from "@nestjs/common"; 
import { MongooseModule } from "@nestjs/mongoose"; 
import { AddressService } from "src/services/address/address.service";
import {Address,AddressSchema} from "../../schemas/address/Address"
import {AddressController} from './address.controller'

@Module({

imports:[MongooseModule.forFeature([{name:Address.name, schema:AddressSchema}])],
controllers:[AddressController],
providers:[AddressService],



})
export class AddressModule {}