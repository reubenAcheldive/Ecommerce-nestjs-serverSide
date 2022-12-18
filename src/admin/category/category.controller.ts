import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { CategoriesService } from "src/client/category/services/categories.services";
import { ICategories } from "src/dtos/categories/categories.dto";

@Controller("api/admin/category")
export class CategoryController {
  constructor(private CS: CategoriesService) {}
  @Post("/create")
  async getCategories(@Body("nameCategory") nameCategory: string) {
    if (!nameCategory)
      throw new BadRequestException({
        success: false,
        message: "nameCategory is missing",
      });
    return await this.CS.createCategory({ nameCategory });
  }
}

