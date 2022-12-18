import { Module } from "@nestjs/common";
import { DbProductsModule } from "src/database/db-products/db-products.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [DbProductsModule],
  providers: [ProductsService],
})
export class ProductsModule {}
