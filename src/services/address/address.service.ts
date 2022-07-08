import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AddressDocuments, Address } from "../../schemas/address/Address";
import { Model } from "mongoose";
import { IAddressValidator } from "../../Dto/address/address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressDb: Model<AddressDocuments>
  ) {}

  
  
}
