import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "src/client/category/services/categories.services";
import { ICategories } from "src/dtos/categories/categories.dto";
 
import { AdminGuard } from "src/guard/admin.guard";
import { AuthenticationGuard } from "src/guard/authentication.guard";

@Controller("api/admin/category")
@UseGuards(AuthenticationGuard, AdminGuard)
export class CategoryController {
  constructor(private CS: CategoriesService) {}
  @Post("/create")
  async getCategories(@Body( ) p:any  ) {
    if (!p.nameCategory || !p.icon)
      throw new BadRequestException({
        success: false,
        message: "nameCategory and  icon is missing",
      });
      console.log(p);
      
    return await this.CS.createCategory({ ...p });
  }
}

