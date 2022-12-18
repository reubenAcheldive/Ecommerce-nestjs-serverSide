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
  async getAllProducts({ page, limit }: { page: number; limit: number }) {
    const getProducts = await this.productDb
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.productDb.find().count();
    return {
      totalPages: Math.ceil(count / limit),

      getProducts,
    };
  }
}

