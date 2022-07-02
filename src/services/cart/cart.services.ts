import { CartSchema } from "src/schemas/carts/carts.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ICart } from "src/Dto/carts/carts.dto";
import { PayloadItems } from "./PayloadItems";
@Injectable()
export class CartServices {
  constructor(@InjectModel("Carts") private cartDb: Model<ICart>) {}

  async getCartByCustomerId(customerRef, status): Promise<ICart[]> {
    return await this.cartDb.find({ customerRef, status }).populate({ path: "items.productRefId" });
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
    return await this.cartWithPopulate(cartId);
  }

  async deleteAllProductsFromCart(cartId: string): Promise<void> {
    return await this.cartDb.findOneAndUpdate(
      { _id: cartId },
      {
        items: [],
      },
      { safe: true, multi: true }
    );
  }

  async deleteProductFromCart(_id: string, itemId: string) {
    console.log(itemId);
    
    await this.deletedItem(_id, null, itemId);
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

  async updateItemInCart({ _id, quantity, productRefId }: PayloadItems) {
    let cart = await this.cartDb.findById({ _id });

    let getAllItems: PayloadItems[] = cart.items;

    let getItem = getAllItems.find(
      (item, i) => item.productRefId === productRefId
    );
    if (getItem?.productRefId) {
      if (quantity === 0) {
        await this.deletedItem(_id, getItem, null);
        return await this.cartWithPopulate(_id);
      }

      getItem.quantity = quantity;
      await cart.save();
      return await this.cartWithPopulate(_id);
    } else if (!getItem && quantity > 0) {
      console.log(2);
      let newItem = [
        {
          productRefId,
          quantity: Number(quantity),
        },
      ];
      console.log({ newItem });
      const addToCart = await this.cartDb.findByIdAndUpdate(
        { _id },
        {
          $push: {
            items: newItem,
          },
        }
      );
      await addToCart.save();
      return await this.cartWithPopulate(_id);
    } else {
      return await this.cartWithPopulate(_id);
    }
  }

  private async deletedItem(
    idCart: string,
    getItem: PayloadItems | null,
    itemId?: string
  ) {
    if (itemId) {
      await this.cartDb.updateOne(
        { _id: idCart },
        { $pull: { items: { _id: itemId } } }
      );
    } else
      await this.cartDb.updateOne(
        { _id: idCart },
        { $pull: { items: { _id: getItem._id } } }
      );
  }

  private async cartWithPopulate(idCart: string) {
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
