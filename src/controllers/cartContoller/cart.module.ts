import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "src/schemas/carts/carts.schema";
import { CartServices } from "src/services/cart/cart.services";

import { CartController } from "./cart.controller";

@Module({
  exports: [],
  imports: [MongooseModule.forFeature([{name:"Carts",schema:CartSchema}])],
  controllers: [CartController],
  providers: [CartServices],
})
export class CartModule {}
