import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "src/schemas/carts/carts.schema";


import { CartController } from "./controller/cart.controller";
import { CartServices } from "./services/cart.services";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Carts", schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartServices],
  exports: [MongooseModule.forFeature([{ name: "Carts", schema: CartSchema }])],
})
export class CartModule { }
