import { OrderController } from "./order/order.controller";
import { MiddlewareConsumer } from "@nestjs/common/interfaces";
import { NestModule } from "@nestjs/common/interfaces";
import { Module } from "@nestjs/common";
import { CatagoriesAndCitiesModule } from "src/client/category/CategoriesAndCities.module";
import { DbCategoriesModule } from "src/database/db-categories/db-categories.module";
import { DbProductsModule } from "src/database/db-products/db-products.module";

import { CategoryController } from "./category/category.controller";
import { ProductsModule } from "./products/products.module";
import { OrderModule } from "./order/order.module";
import { UsersModule } from "./users/users.module";
import * as UserClientModule from "src/client/user/user.module";

import { GetUserMiddlewareMiddleware } from "src/middleware/get-user-middleware.middleware";
import { UsersController } from "./users/controller/users.controller";
import { ProductsController } from "./products/products.controller";

@Module({
  imports: [
    CatagoriesAndCitiesModule,
    ProductsModule,
    OrderModule,
    UsersModule,
    UserClientModule.UserModule,
  ],
  controllers: [CategoryController],
  providers: [],
})
export class AdminModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer): void {
//     consumer
//       .apply(GetUserMiddlewareMiddleware)
//       .forRoutes(
//         UsersController,
//         ProductsController,
//         OrderController,
//         CategoryController
//       );
//   }
// }
