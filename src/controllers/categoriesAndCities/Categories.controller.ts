import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "src/services/categories/categories.services";


@Controller("/api/store")
export class CategoriesContoller {
  constructor(private categoriesService: CategoriesService) {}
@Get("/category")
  async getCategories() {
    return await this.categoriesService.fetchCategories();
  }
}
