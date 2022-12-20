import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  UpdateCartList,
  updateOneItemInCartItems,
} from "src/dtos/carts/updateCartProduct";

import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ClientGuard } from "src/guard/client.guard";
import { CartServices } from "../services/cart.services";

@Controller("api/store")
@UseGuards(AuthenticationGuard, ClientGuard)
export class CartController {
  constructor(private cartService: CartServices) {}
  @Get("/get-cart-by-customer-ref/:customerRef")
  async getCartByCustomerRef(@Param("customerRef") customerRef: string) {
    if (!customerRef)
      throw new BadRequestException({ message: "customerRef is required" });
    const haveAvailableCart = await this.cartService.getCartByCustomerId(
      customerRef,
      1
    );
    if (haveAvailableCart.length > 0) {
      return haveAvailableCart[0];
    }
  }

  @Get("/getByCartId/:cartId")
  async getCartById(@Param("cartId") cartId: string): Promise<any> {
    if (!cartId)
      throw new BadRequestException({ message: "cartId is required" });

    const getCart = await this.cartService.getCartById(cartId);
    return getCart;
  }
  @Post("/deleteAllProducts")
  async deleteAllProducts(@Body() { cartId }): Promise<void> {
    await this.cartService.deleteAllProductsFromCart(cartId);
  }
  @Post("/deleteProduct")
  async deleteOnProduct(@Body() { cartId, itemId }): Promise<any> {
    return await this.cartService.deleteProductFromCart(cartId, itemId);
  }

  @Post("/add-all-items-to-cart")
  async saveProductToCart(@Body() { cartId, items }: UpdateCartList) {
    const cart = await this.cartService.saveProductToCart(cartId, items);

    return cart;
  }

  @Post("/addNewCart")
  async addNewCart(@Body("customerRef") customerRef: string) {
    return await this.cartService.createNewCart(customerRef);
  }

  @Post("/update-one-item-cart")
  async updateItemCart(
    @Body() { idCart: _id, quantity, productRefId }: updateOneItemInCartItems
  ) {
    return await this.cartService.updateItemInCart({
      _id,
      quantity,
      productRefId,
    });
  }
}

