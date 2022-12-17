import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/CatagoriesAndCities/categories.schema";



import { CategoriesContoller } from "./controller/Categories.controller";
import { CategoriesService } from "./services/categories.services";

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
export class CatagoriesAndCitiesModule {}
