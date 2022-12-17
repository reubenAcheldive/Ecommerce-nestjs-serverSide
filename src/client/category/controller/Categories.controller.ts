import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "../..//category/services/categories.services";

@Controller("/")
export class CategoriesContoller {
  constructor(private categoriesService: CategoriesService) {}
  @Get("/category")
  async getCategories() {
    return await this.categoriesService.fetchCategories();
  }
}
