import { Controller, Get, Param } from "@nestjs/common";
import { get } from "mongoose";
import { OrderService } from "./order.service";

@Controller("api/admin/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get("/get-all-order/:page")
  async getOrders(@Param("page") page: number) {
    return await this.orderService.getOrders({ page, limit: 5 });
  }
}

