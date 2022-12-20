import { Module } from "@nestjs/common";

import { DbCategoriesModule } from "src/database/db-categories/db-categories.module";

import { CategoriesContoller } from "./controller/Categories.controller";
import { CategoriesService } from "./services/categories.services";

@Module({
  imports: [DbCategoriesModule],
  controllers: [CategoriesContoller],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CatagoriesAndCitiesModule {}
