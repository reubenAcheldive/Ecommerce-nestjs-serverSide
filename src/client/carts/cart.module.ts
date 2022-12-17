import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DbCartsModule } from "src/database/db-carts/db-carts.module";
import { CartSchema } from "src/schemas/carts/carts.schema";

import { CartController } from "./controller/cart.controller";
import { CartServices } from "./services/cart.services";

@Module({
  imports: [DbCartsModule],
  controllers: [CartController],
  providers: [CartServices],
  exports: [],
})
export class CartModule {}
