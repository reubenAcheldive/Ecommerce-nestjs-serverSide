import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartSchema } from "src/schemas/carts/carts.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Carts", schema: CartSchema }])],
  exports: [MongooseModule.forFeature([{ name: "Carts", schema: CartSchema }])],
})
export class DbCartsModule {}
