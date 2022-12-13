import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/CatagoriesAndCities/categories.schema";
import { CitiesSchema } from "src/schemas/CatagoriesAndCities/cities.schema";
import { CategoriesService } from "src/services/categories/categories.services";
import { CitiesService } from "src/services/categories/cities.services";
import { CategoriesContoller } from "./Categories.controller";

const settings = [
  {
    name: "Categories",
    schema: CategorySchema,
  },

];
@Module({
  imports: [MongooseModule.forFeature(settings)],
  controllers: [CategoriesContoller],
  providers: [CategoriesService],
  exports: [MongooseModule.forFeature(settings), CategoriesService],
})
export class CatagoriesAndCitiesModule { }
