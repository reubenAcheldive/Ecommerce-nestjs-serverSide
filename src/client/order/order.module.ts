import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrderSchema } from "src/schemas/order/order.schema";


import { OrderController } from "./controller/order.controller";


import { PaymentModule } from "../payment/payment.module";

import { UserModule } from "../user/user.module";
import { CartServices } from "../carts/services/cart.services";
import { GeneratorPDfService } from "../pdf/services/generatorPDf.service";
import { OrderServices } from "./services/order.services";
import { CartModule } from "../carts/cart.module";
import { AddressModule } from "../address/address.module";

@Module({
  controllers: [OrderController],
  providers: [OrderServices, CartServices, GeneratorPDfService],
  imports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
    CartModule,
    AddressModule,
    PaymentModule,
    UserModule,
  ],
  exports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
  ],
})
export class OrderModule { }
