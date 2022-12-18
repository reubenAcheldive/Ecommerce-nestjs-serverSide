import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { IAddressValidator } from "src/dtos/address/address.dto";
import { AddressService } from "../services/address.service";

@Controller('api/store/addresses/')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get(":customerRef")
  async getAddressByCustomerRef(@Param("customerRef") customerRef: string) {
    return this.addressService.getAddressByCustomerRef({ customerRef });
  }
  @Post("edit")
  async editAddress(@Body() payload: Omit<IAddressValidator, "default">) {
    return await this.addressService.editAddresses(payload);
  }
  @Post("create")
  async createNewAddress(@Body() payload: Omit<IAddressValidator, "default">) {
    return await this.addressService.createNewAddress(payload);
  }
  @Put("pick/address/default")
  async pickAddress(
    @Body() payload: Required<Pick<IAddressValidator, "_id" | "default">>
  ) {
    return this.addressService.updateDefault(payload);
  }
}
