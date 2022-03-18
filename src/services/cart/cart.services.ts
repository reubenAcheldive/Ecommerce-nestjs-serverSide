import { CartSchema } from 'src/schemas/carts/carts.schema';
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
    return await this.cartDb.find({ _id: cartId }).populate({
      path: "cartItems.products",
      select: "name price imgUrl description",
    });
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

  async deleteProductFromCart(_id: string, productId: string) {
    console.log(_id,productId);
    
    return await this.cartDb.updateOne(
      { _id },
      {
        $pull: {
          cartItems: { _id: productId },
        },
      },
      { safe: true, multi: true }
    ).exec();
  }

  async saveProductToCart(
    _id: string,

    productRefId: string,
    quantity: number
  ) {
    const cart = await this.cartDb.findById(_id);
    const cartItems: any[] = await cart?.get("cartItems");

    let product = cartItems.find(
      (product) => product.products === productRefId
    );

    if (product) {
      console.log(product, "begoure update price");

      product.quantity = quantity;
     
      
    } else {
      product = await this.cartDb
        .findOneAndUpdate(
          { _id },
          {
            $push: {
              cartItems: { quantity, products: productRefId },
            },
          },
          { new: true }
        )
        .populate({
          path: "cartItems.products",
          select: "name price imgUrl description",
        });
      return product;
    }
    await cart?.save();
    const productItem = await this.cartDb.findById({ _id }).populate({
      path: "cartItems.products",
      select: "name price imgUrl description",
    });
    console.log({cart});
    
console.log({productItem});

    return productItem;
  }
}
