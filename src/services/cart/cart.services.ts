import { CartSchema } from "src/schemas/carts/carts.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ICart } from "src/Dto/carts/carts.dto";
@Injectable()
export class CartServices {
  constructor(@InjectModel("Carts") private cartDb: Model<ICart>) {}

  async getCartByCustomerId(customerRef, status): Promise<ICart[]> {
    return await this.cartDb.find({ customerRef, status }).populate({
      path: "cartItems.products",
      select: "name price imgUrl description",
    });
  }

  async createNewCart(customerRef: string): Promise<ICart> {
    await this.cartDb.updateMany({ customerRef, $set: { status: 2 } });
    const cart = new this.cartDb({
      customerRef,
      date: Date.parse(Date()),
      status: 1,
    });
    return await cart.save();
  }
  async deleteLastCart(customerRef: string) {
    return await this.cartDb.deleteMany({ customerRef });
  }

  async getCartById(cartId: string) {
    const returnCart = this.cartDb
      .findById({ _id: cartId })
      .populate({ path: "items.productRefId" });
    return await returnCart;
  }

  async deleteAllProductsFromCart(cartId: string): Promise<void> {
    return await this.cartDb.findOneAndUpdate(
      { _id: cartId },
      {
        cartItems: [],
      },
      { safe: true, multi: true }
    );
  }

  async deleteProductFromCart(_id: string) {
    return await this.cartDb
      .updateOne(
        { _id },
        {
          $pull: {
            items: [],
          },
        },
        { safe: true, multi: true }
      )
      .exec();
  }

  async saveProductToCart(
    _id: string,

    items: [
      {
        quantity: number;
        productRefId: string;
      }
    ]
  ) {
    const addToCart = await this.cartDb.findByIdAndUpdate(
      { _id },
      {
        $push: {
          items: items,
        },
      }
    );
    await addToCart.save({ validateBeforeSave: true });
    const returnCart = this.cartDb
      .findById({ _id })
      .populate({ path: "items.productRefId" });
    return await returnCart;
  }

  async updateItemInCart(
    idCart: string,
    quantity: number,
    productRefId: string
  ) {
    let cart = await this.cartDb.findById({ _id: idCart });
  

    let getAllItems: [
      {
        quantity: Number;
        productRefId: String;
      }
    ] = cart.items;

    let getItem = getAllItems.find((item) => item.productRefId == productRefId);

    if (!getItem?.productRefId) return;

    getItem.quantity = quantity;

    await cart.save();
    
    const returnCart = this.cartDb
      .findById({ _id: idCart })
      .populate({ path: "items.productRefId" });
    return await returnCart;
  }

  async updateCart(idCart: string, status: number) {
    const cartUpdate = await this.cartDb.findByIdAndUpdate(
      { _id: idCart },
      { $set: { status: status } }
    );
    return cartUpdate.save();
  }

  async getTotalCostOfOrder(_id: string) {
    const cart = await this.cartDb
      .findById(_id)
      .populate({ path: "cartItems.productRefId", select: "price" });

    const productPrices: any[] = await cart?.get("cartItems");

    return this.getTotalCost(productPrices);
  }

  getTotalCost(listProduct: any) {
    if (listProduct) {
      const item = listProduct.map(
        ({ quantity, products }: any) => quantity * products.price
      );

      return item.reduce((acc: number, value: number) => acc + value, 0);
    }
  }
}
