import { Module } from "@nestjs/common";
import { CatagoriesAndCitiesModule } from "src/client/category/CategoriesAndCities.module";

import { CategoryController } from "./category/category.controller";

@Module({
  imports: [CatagoriesAndCitiesModule],
  controllers: [CategoryController],
  providers: [],
})
export class AdminModule {}
