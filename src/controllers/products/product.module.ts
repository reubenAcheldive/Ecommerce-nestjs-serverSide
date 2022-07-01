import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "src/services/products/prodcut.service";
import {
  Products,
  ProudctsSchema,
} from "../../schemas/products/product.schema";
import { CartModule } from "../cart/cart.module";
import { ProductsController } from "./product.controller";
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
