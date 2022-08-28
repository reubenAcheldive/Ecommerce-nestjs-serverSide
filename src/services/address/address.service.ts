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

  async findAddressesById(_id: string) {
    return await this.addressDb.findById({ _id });
  }

  async getAddressByCustomerRef({ customerRef }: { customerRef: string }) {
    return await this.addressDb.findOne({ customerRef: customerRef });
  }
  async editAddresses(payload: IAddressValidator) {
    const {
      city,
      customerRef,
      departmentNumber,
      homeNumber,
      entering,
      streetAddress,
      _id,
    } = payload;
    const address = await this.addressDb.findByIdAndUpdate(
      { _id: payload._id },
      {
        city,
        customerRef,
        departmentNumber,
        homeNumber,
        entering,
        streetAddress,
      }
    );
    console.log(address);

    await address.save();
    return await this.findAddressesById(_id);
  }
}
