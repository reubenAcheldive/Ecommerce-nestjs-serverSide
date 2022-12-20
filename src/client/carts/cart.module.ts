import { Module } from "@nestjs/common";
 import { DbCartsModule } from "src/database/db-carts/db-carts.module";
 

import { CartController } from "./controller/cart.controller";
import { CartServices } from "./services/cart.services";

@Module({
  imports: [DbCartsModule],
  controllers: [CartController],
  providers: [CartServices],
  exports: [CartServices],
})
export class CartModule {}
