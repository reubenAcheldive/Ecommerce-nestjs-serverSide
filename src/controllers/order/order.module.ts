import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrderSchema } from "src/schemas/order/order.schema";
import { CartServices } from "src/services/cart/cart.services";

import { OrderServices } from "src/services/order/order.services";
import { CartModule } from "../cart/cart.module";

import { OrderController } from "./order.controller";

import { AddressModule } from "../adrress/address.module";
import { PaymentModule } from "../payment/payment.module";
@Module({
  controllers: [OrderController],
  providers: [OrderServices, CartServices],
  imports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
    CartModule,
    AddressModule,
    PaymentModule,
  ],
})
export class OrderModule {}
