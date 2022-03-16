import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/CatagoriesAndCities/categories.schema";
import { CitiesSchema } from "src/schemas/CatagoriesAndCities/cities.schema";
import { CategoriesService } from "src/services/categories/categories.services";
import { CitiesService } from "src/services/categories/cities.services";
import { CategoriesContoller } from "./Categories.controller";
import { CitiesContoller } from "./cities.controller";
const settings = [
  {
    name: "Categories",
    schema: CategorySchema,
  },
  { name: "Cities", schema: CitiesSchema },
];
@Module({
  imports: [MongooseModule.forFeature(settings)],
  controllers: [CategoriesContoller,CitiesContoller],
  providers: [CategoriesService,CitiesService],
  exports: [],
})
export class CatagoriesAndCitiesModule {}
