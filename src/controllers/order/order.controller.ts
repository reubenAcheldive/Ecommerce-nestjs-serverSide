import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";
import { CartServices } from "src/services/cart/cart.services";
import { OrderServices } from "src/services/order/order.services";
import { GeneratorPDfService } from "src/services/PDF/generatorPDf.service";

import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { dirname } from "path";
@Controller("api/store/order")
export class OrderController {
  constructor(
    private orderService: OrderServices,
    private cartService: CartServices,

  ) { }
  @Post("/createNewOrder")
  async createNewOrderForCustomer(@Body() payload: Required<Omit<OrderSchemaDto, "addressRef">>) {

    return await this.orderService.createNewOrder(payload);
  }

  @Get("/getLastOrder/:_id")

  getFile(@Res({ passthrough: true }) res: Response, @Param("_id") _id: string): StreamableFile {
    console.log(_id);
    const nameFile = ` ${_id}.pdf`

    const t = join(process.cwd(), `src/orderFiles/${_id}.pdf`)
    const file = createReadStream(t);
    res.set({
      'Content-Type': 'image/pdf',
      'Content-Disposition': `attachment; filename=${nameFile}`,
    });
    return new StreamableFile(file);
  }

  @Get("/all-orders")
  async quantityOfOrders() {
    const quantityOrders = await this.orderService.getAllOrder();
    return { quantityOrders };
  }
  @Get("/check-order-date")
  async validateDateOrder() {
    const DateDelivery = await this.orderService.getAvailableOrderDate();
    return DateDelivery;
  }
 
}
