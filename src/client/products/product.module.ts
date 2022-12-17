import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
 
import {
  Products,
  ProudctsSchema,
} from "../../schemas/products/product.schema";
import { CartModule } from "../carts/cart.module";
 import { ProductsController } from "./controllers/product.controller";
import { ProductService } from "./services/prodcut.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProudctsSchema },
    ]),
    CartModule,
  ],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [],
})
export class ProductsModule {}
