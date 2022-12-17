import { Module } from "@nestjs/common";
import { DbProductsModule } from "src/database/db-products/db-products.module";

 
import { ProductsController } from "./controllers/product.controller";
import { ProductService } from "./services/prodcut.service";
@Module({
  imports: [DbProductsModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
