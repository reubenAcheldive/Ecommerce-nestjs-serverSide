import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AddressDocuments, Address } from "../../../schemas/address/Address";
import { Model } from "mongoose";
import { IAddressValidator } from "src/dtos/address/address.dto";
 

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressDb: Model<AddressDocuments>
  ) {}

  async findAddressesById(_id: string) {
    return await this.addressDb.findById({ _id });
  }

  async getAddressByCustomerRef({ customerRef }: { customerRef: string }) {
    return await this.addressDb.find({ customerRef: customerRef });
  }
  async editAddresses(payload: Omit<IAddressValidator, "default">) {
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

    await address.save();
    return await this.findAddressesById(_id);
  }
  async createNewAddress(payload: Omit<IAddressValidator, "default">) {
    await this.updateDefaultManyToFalse();
    return await (await this.addressDb.create(payload)).save();
  }
  async updateDefaultManyToFalse() {
    await this.addressDb.updateMany({ default: false });
  }
  async updateDefault(p: Required<Pick<IAddressValidator, "_id" | "default">>) {
    await this.updateDefaultManyToFalse();
    const t = await this.addressDb.findByIdAndUpdate(
      {
        _id: p._id,
      },
      { $set: { default: p.default } }
    );
    return await this.findAddressesById(t._id.toString());
  }

  async findDefaultAddress({ customerRef }) {
    return await this.addressDb.find({ customerRef, default: true });
  }
}
