import { Controller, Get, Param, UseGuards } from "@nestjs/common";

import { AdminGuard } from "src/guard/admin.guard";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { OrderService } from "./order.service";

@Controller("api/admin/order")
@UseGuards(AuthenticationGuard, AdminGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get("/get-all-order/:page")
  async getOrders(@Param("page") page: number) {
    return await this.orderService.getOrders({ page, limit: 5 });
  }
}
