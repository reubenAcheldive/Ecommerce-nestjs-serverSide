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

@Controller("api/store")
export class OrderController {
  constructor(
    private orderService: OrderServices,
    private cartService: CartServices
  ) {}
  @Post("/createNewOrder")
  async createNewOrderForCustomer(@Body() payload: OrderSchemaDto) {
    const order = await this.orderService.checkDateDelivery(
      payload.DateDelivery
    );

    if (!order) throw new ForbiddenException({ message: "book is full" });
    const getTotalPrice = await this.cartService.getTotalCostOfOrder(
      payload.cartRef
    );
    if (!getTotalPrice)
      throw new ForbiddenException({
        message: "need at last 1 product to buy",
      });
    const newOrder = await this.orderService.createNewOrder({
      ...payload,
    });

    const promises = Promise.all([
      await newOrder?.save(),

      await (await this.cartService.updateCart(payload.cartRef, 2))?.save(),
    ]);
    if (await promises)
      return {
        message: "new Order was created successfully ",
        idOrder: newOrder._id,
      };
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
