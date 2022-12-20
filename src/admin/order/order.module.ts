import { DbOrderModule } from "./../../database/db-order/db-order.module";
import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [DbOrderModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

