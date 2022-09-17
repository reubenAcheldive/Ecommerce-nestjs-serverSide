import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IAddressValidator } from "../../Dto/address/address.dto";
import { AddressService } from "src/services/address/address.service";
import { path } from "pdfkit";

@Controller("api/store/addresses")
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get(":customerRef")
  async getAddressByCustomerRef(@Param("customerRef") customerRef: string) {
    
    return this.addressService.getAddressByCustomerRef({ customerRef });
  }
  @Post("edit")
  async editAddress(@Body() payload: IAddressValidator) {
 
    return await this.addressService.editAddresses(payload);
  }
}
