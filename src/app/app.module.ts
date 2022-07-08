import { CartModule } from "../controllers/cart/cart.module";
import { CatagoriesAndCitiesModule } from "./../controllers/categoriesAndCities/CategoriesAndCities.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "src/controllers/products/product.module";
import { UserModule } from "src/controllers/userAuth/user.module";
import { GetUserMiddleware } from "src/middleware/get-user.middleware";
import { CartController } from "src/controllers/cart/cart.controller";
import { MongoDB } from "src/config";
import { OrderModule } from "src/controllers/order/order.module";
import { CheckToken } from "src/controllers/userAuth/checkToken.contoller";
import { AddressModule } from "src/controllers/adrress/address.module";

@Module({
  imports: [
  
    MongooseModule.forRoot(MongoDB),
    UserModule,
    CatagoriesAndCitiesModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer):void {
    //forRouts is protect the endpoint without jwt
    consumer.apply(GetUserMiddleware).forRoutes(CheckToken,CartController)
  }
}
