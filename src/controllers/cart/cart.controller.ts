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
import { UpdateCartList, updateOneItemInCartItems } from "src/Dto/carts/updateCartProduct";
import { AuthenticationGuard } from "src/gurds/authentication.guard";
import { CartServices } from "src/services/cart/cart.services";
import { shoppingCartNormalizedInfo } from "src/utils/shoppingCartNormalized";

@Controller("api/store")
@UseGuards(AuthenticationGuard)
export class CartController {
  constructor(private cartService: CartServices) {}
  @Get("/getCart/:customerRef")
  async getCartShopping(@Param("customerRef") customerRef: string) {
    if (!customerRef)
      throw new BadRequestException({
        success: false,
        message: "customerRef must provider",
      });
    const cartResponse1 = await this.cartService.getCartByCustomerId(
      customerRef,
      1
    );

    if (cartResponse1.length === 0) {
      const cartResponse2 = await this.cartService.getCartByCustomerId(
        customerRef,
        2
      );

      if (cartResponse2[cartResponse2.length - 1]) {
        const lastCart = [cartResponse2[cartResponse2.length - 1]];

        return {
          message: "Your last order was from",
          cart: lastCart,
          hasOpenCart: false,
        };
      } else {
        return {
          message: "Welcome to our shop",
        };
      }
    } else {
      return {
        message: "You have an open cart from",
        cart: cartResponse1,
        hasOpenCart: true,
      };
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
  async deleteOnProduct(@Body() { cartId }): Promise<any> {
    return await this.cartService.deleteProductFromCart(cartId);
  }

  @Post("/add-all-items-to-cart")
  async saveProductToCart(@Body() { cartId, items }: UpdateCartList) {
    const cart = await this.cartService.saveProductToCart(cartId, items);

    return  cart;
  }

  @Post("/addNewCart")
  async addNewCart(@Body("customerRef") customerRef: string) {
    return await this.cartService.createNewCart(customerRef);
  }
  
  @Post("/update-one-item-cart")
  async updateItemCart(@Body() {idCart,quantity,productRefId}:updateOneItemInCartItems){
    return await this.cartService.updateItemInCart(idCart,quantity,productRefId)
  }


}
