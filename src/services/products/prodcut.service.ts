import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import {
  Products,
  ProductDocument,
} from "../../schemas/products/product.schema";
import { Model } from "mongoose";
import { IProduct } from "src/Dto/products/products.dto";
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) private productDb: Model<ProductDocument>
  ) {}

  async getAllProductsByCategories(categoryRef: string): Promise<IProduct[]> {
    return await this.productDb.find({
    categoryRef,
    });
  }

  async getProductById(_id: string) {
    const category = await this.productDb.find({ _id });
    return category;
  }
  async editProduct(id: string, product: IProduct) {
    console.log(id, { product });

    const editProduct = await this.productDb.findOneAndUpdate(
      {
        _id: id,
      },
      product,
      { new: true }
    );
    return editProduct;
  }

  async searchProductByName(nameProduct: string): Promise<IProduct[]> {
    const searchProductByName = await this.productDb.find({
      name: { $regex: "^" + nameProduct },
    });

    return searchProductByName;
  }
  async getAllProducts() {
    return await this.productDb.find({});
  }
  async createProduct(payload: IProduct) {
    return await this.productDb.create(payload);
  }
}
