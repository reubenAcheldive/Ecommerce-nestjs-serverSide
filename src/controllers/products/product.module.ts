import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "src/services/products/prodcut.service";
import {
  Products,
  ProudctsSchema,
} from "../../schemas/products/product.schema";
import { ProductsController } from "./product.controller";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProudctsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [],
})


export class ProductsModule {}
