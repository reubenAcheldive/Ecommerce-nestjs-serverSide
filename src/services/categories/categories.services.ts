import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CategorySchema } from "../../schemas/CatagoriesAndCities/categories.schema";
import { ICategoies } from "src/Dto/categories/categories.dto";
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Categories")   private categories: Model<ICategoies>
  ) {}

  async fetchCategories() {
    return this.categories.find({});
  }
}
