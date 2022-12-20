import { AddressController } from "./../client/address/controller/address.controller";
import { OrderController } from "./../client/order/controller/order.controller";
import { PaymentController } from "./../client/payment/controller/payment.controller";
import { CategoryController } from "./../admin/category/category.controller";
import { AppController } from "./app.controller";
import { AdminModule } from "./../admin/admin.module";
import { Module } from "@nestjs/common/decorators";
import configuration from "../config/configuration";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppService } from "./app.service";
import { MiddlewareConsumer, NestModule } from "@nestjs/common/interfaces";
import { MongoDB } from "../config";
import { CheckToken } from "../client/user/controllers/checkToken.contoller";
import { CartController } from "../client/carts/controller/cart.controller";
import { ClientModule } from "src/client/client.module";
import { UserModule } from "src/client/user/user.module";
import { RouterModule } from "@nestjs/core/router";
import { LazyModuleLoader } from "@nestjs/core/injector";
import { GetUserMiddlewareMiddleware } from "src/middleware/get-user-middleware.middleware";

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../client'),
    //   serveStaticOptions: {
    //     redirect: true,
    //   },
    // }),
    ConfigModule.forRoot({
      envFilePath: ".development.env",
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(MongoDB),
    ClientModule,
    UserModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetUserMiddlewareMiddleware)
      .forRoutes(
        CheckToken,
        CartController,
        PaymentController,
        OrderController,
        AddressController
      );
  }
}

