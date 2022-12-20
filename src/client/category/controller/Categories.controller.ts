import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "../..//category/services/categories.services";

@Controller("api/store/category")
export class CategoriesContoller {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/")
  async getCategories() {
  
    
    return await this.categoriesService.fetchCategories();
  }
}

