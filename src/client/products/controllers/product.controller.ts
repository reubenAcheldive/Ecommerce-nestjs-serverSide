import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IProduct } from "../../../dtos/products/products.dto";
import { ProductService } from "../../products/services/prodcut.service";

@Controller("/")
export class ProductsController {
  constructor(private productService: ProductService) {}
  @Post("/category/:categoryRef")
  async fetchProductByCategoryId(
    @Param("categoryRef") categoryRef: string
  ): Promise<IProduct[]> {
    return await this.productService.getAllProductsByCategories(categoryRef);
  }

  @Post("/search/nameProduct")
  async fetchPRoductByName(@Body("name") name: string): Promise<IProduct[]> {
    return await this.productService.searchProductByName(name);
  }
  @Post("/add-new-product")
  async createNewProduct(@Body() payload: IProduct): Promise<IProduct> {
    const newProduct = await this.productService.createProduct(payload);
    await newProduct.save();
    return newProduct;
  }
}
