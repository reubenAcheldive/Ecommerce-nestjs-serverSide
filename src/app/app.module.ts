import { CartModule } from "../controllers/cart/cart.module";
import { CatagoriesAndCitiesModule } from "./../controllers/categoriesAndCities/CategoriesAndCities.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "src/controllers/products/product.module";
import { UserModule } from "src/controllers/userAuth/user.module";

import { MongoDB } from "src/config";
import { OrderModule } from "src/controllers/order/order.module";
import { CheckToken } from "src/controllers/userAuth/checkToken.contoller";
import { AddressModule } from "src/controllers/adrress/address.module";
import { PaymentModule } from "src/controllers/payment/payment.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";

import { ServeStaticModule } from "@nestjs/serve-static/dist";
import { join } from "path";
import { GetUserMiddleware } from "src/middleware/get-user.middleware";
import { CartController } from "src/controllers/cart/cart.controller";
import { AdminModule } from "src/controllers/admin/admin.module";
import { RouterModule } from "@nestjs/core";




@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../client'),

    //   serveStaticOptions: {
    //     redirect: true,

    //   },



    // }),
    ConfigModule.forRoot({ envFilePath: ".development.env", load: [configuration], isGlobal: true, }),
    MongooseModule.forRoot(MongoDB),
    UserModule,
    CatagoriesAndCitiesModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AddressModule,

    PaymentModule,
    AdminModule,
    RouterModule.register([{
      path: "admin",
      module: AdminModule,

    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GetUserMiddleware).forRoutes(CheckToken, CartController);
  }
}
