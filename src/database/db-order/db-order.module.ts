import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "src/schemas/order/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: "Orders", schema: OrderSchema }]),
  ],
})
export class DbOrderModule {}
