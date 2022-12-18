import { IProduct } from "src/dtos/products/products.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("admin/products")
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
}

