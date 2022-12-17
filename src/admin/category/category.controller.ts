import { Body, Controller, Get } from "@nestjs/common";
import { CategoriesService } from "src/client/category/services/categories.services";
import { ICategories } from "src/dtos/categories/categories.dto";


@Controller("category")
export class CategoryController {
  constructor(private CS: CategoriesService) { }
  @Get("/")
  async getCategories(
    @Body() { nameCategory }: Pick<ICategories, "nameCategory">
  ) {
    return this.CS.createCategory({ nameCategory });
  }
}
