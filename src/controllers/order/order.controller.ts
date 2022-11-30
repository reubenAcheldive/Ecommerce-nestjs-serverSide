import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";
import { CartServices } from "src/services/cart/cart.services";
import { OrderServices } from "src/services/order/order.services";

@Controller("api/store/order")
export class OrderController {
  constructor(
    private orderService: OrderServices,
    private cartService: CartServices
  ) {}
  @Post("/createNewOrder")
  async createNewOrderForCustomer(@Body() payload: Required<Omit<OrderSchemaDto,"addressRef">>) {
    return await this.orderService.createNewOrder(payload);
  }

  @Get("/getLastOrder/:_id")
  async getLastOrder(@Param("_id") _id: string) {
    const lastOrder = await this.orderService.getDetailsOrder(_id);

  
    return lastOrder;
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
