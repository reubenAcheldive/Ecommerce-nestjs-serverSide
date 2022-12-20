import { APP_GUARD } from "@nestjs/core";
import { RouterModule } from "@nestjs/core/router";
import { Module } from "@nestjs/common";
import { AddressModule } from "./address/address.module";
import { CartModule } from "./carts/cart.module";
import { CatagoriesAndCitiesModule } from "./category/CategoriesAndCities.module";
import { OrderModule } from "./order/order.module";
import { PaymentModule } from "./payment/payment.module";
import { ProductsModule } from "./products/product.module";
import { AuthorizationGuard } from "src/guard/authorization.guard";

@Module({
  imports: [
    CatagoriesAndCitiesModule,

    ProductsModule,
    CartModule,
    OrderModule,
    AddressModule,
    PaymentModule,
  ],
})
export class ClientModule {}

