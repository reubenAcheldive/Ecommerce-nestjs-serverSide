import { Module } from "@nestjs/common";
import { CatagoriesAndCitiesModule } from "src/client/category/CategoriesAndCities.module";
import { DbCategoriesModule } from "src/database/db-categories/db-categories.module";
import { DbProductsModule } from "src/database/db-products/db-products.module";

import { CategoryController } from "./category/category.controller";
import { ProductsModule } from "./products/products.module";
import { OrderModule } from './order/order.module';
const allDbModules = [DbCategoriesModule, DbProductsModule];
@Module({
  imports: [  CatagoriesAndCitiesModule, ProductsModule, OrderModule],
  controllers: [CategoryController],
  providers: [],
})
export class AdminModule {}

