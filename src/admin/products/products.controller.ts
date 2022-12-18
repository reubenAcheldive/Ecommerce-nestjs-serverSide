import { IProduct } from "src/dtos/products/products.dto";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("api/admin/products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post("/create-product")
  async createNewProduct(@Body() p: IProduct) {
    return await this.productService.createNewProduct(p);
  }
  @Post("/edit-product")
  async editNewProduct(@Body() p: Required<IProduct>) {
    return await this.productService.editNewProduct(p);
  }
  @Get("/get-all-products/:page")
  async getAllProducts(@Param("page") page: number) {
    return await this.productService.getAllProducts({ page, limit: 10 });
  }
}
