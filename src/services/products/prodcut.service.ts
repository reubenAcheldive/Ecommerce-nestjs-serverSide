import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import {
  Products,
  ProductDocument,
} from "../../schemas/products/product.schema";
import { Model } from "mongoose";
import { IProduct } from "src/Dto/products/products.dto";
import { ICart } from "src/Dto/carts/carts.dto";
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Products.name) private productDb: Model<ProductDocument>,
    @InjectModel("Carts") private cartDb: Model<ICart>
  ) {}

  async getAllProductsByCategories(
    categoryRef: string,
    cartId: string
  ): Promise<IProduct[]> {
    const getProducts = await this.productDb.find({
      categoryRef,
    });

    if (cartId) {
      const getCartItems = (await this.cartDb.findById({ _id: cartId })).items;

      if (getCartItems?.length) {
        let products: IProduct[] = [];
        const itemsDictionary: Record<string, number> = {};
        getCartItems.forEach((item, i) => {
          itemsDictionary[item.productRefId] = item.quantity;
        });
        getProducts.forEach((product: IProduct) => {
          console.log(itemsDictionary[product._id]);

          products.push({
            name: product.name,
            categoryRef: product.categoryRef,
            price: product.price,
            imgUrl: product.imgUrl,
            description: product.description,
            _id: product._id,
            quantity: (product.quantity = itemsDictionary[product._id] || 0),
          });
        });
        return  products ;
      }
    } else {
      return getProducts;
    }
  }

  async getProductById(_id: string) {
    const category = await this.productDb.find({ _id });
    return category;
  }
  async editProduct(id: string, product: IProduct) {
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
