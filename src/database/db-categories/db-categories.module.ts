import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/CatagoriesAndCities/categories.schema";
const settings = [
  {
    name: "Categories",
    schema: CategorySchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(settings)],
  exports: [MongooseModule.forFeature(settings)],
})
export class DbCategoriesModule {}
