import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "src/schemas/carts/carts.schema";
import { OrderSchema } from "src/schemas/order/order.schema";
import { CartServices } from "src/services/cart/cart.services";

import { OrderServices } from "src/services/order/order.services";
import { CartModule } from "../cart/cart.module";

import { OrderController } from "./order.controller";

@Module({
  controllers: [OrderController],
  providers: [OrderServices, CartServices],
  imports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
    CartModule,
  ],
})
export class OrderModule {}
