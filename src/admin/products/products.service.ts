import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "src/dtos/products/products.dto";
import { ProductDocument, Products } from "src/schemas/products/product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productDb: Model<ProductDocument>
  ) {}
  async createNewProduct(p: IProduct) {
    const newProduct = new this.productDb({ ...p });
    return await newProduct.save();
  }
  async editNewProduct(p: Required<IProduct>) {
    return await this.productDb.findByIdAndUpdate(p._id, { ...p });
  }
}

