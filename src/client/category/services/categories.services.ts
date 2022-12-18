import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { ICategories } from "../../../dtos/categories/categories.dto";
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Categories") private categories: Model<ICategories>
  ) {}

  async fetchCategories() {
    return this.categories.find({});
  }

  async createCategory({ nameCategory }) {
    return await (await this.categories.create({ nameCategory })).save();
  }
}

