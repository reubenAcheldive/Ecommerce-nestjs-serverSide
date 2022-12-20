import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { OrderSchemaDto } from "../../../dtos/order/orderSchema.dto";

import { OrderServices } from "../..//order/services/order.services";

import { createReadStream } from "fs";
import { join } from "path";
import type { Response } from "express";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ClientGuard } from "src/guard/client.guard";

@Controller("api/store/order")
@UseGuards(AuthenticationGuard, ClientGuard)
export class OrderController {
  constructor(private orderService: OrderServices) {}
  @Post("/createNewOrder")
  async createNewOrderForCustomer(
    @Body() payload: Required<Omit<OrderSchemaDto, "addressRef" | "userName">>
  ) {
 

    return await this.orderService.createNewOrder(payload);
  }

  @Get("/getLastOrder/:_id")
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param("_id") _id: string
  ): StreamableFile {
     const nameFile = ` ${_id}.pdf`;

    const t = join(process.cwd(), `src/orderFiles/${_id}.pdf`);
    const file = createReadStream(t);
    res.set({
      "Content-Type": "image/pdf",
      "Content-Disposition": `attachment; filename=${nameFile}`,
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

