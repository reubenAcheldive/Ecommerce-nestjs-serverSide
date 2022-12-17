import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Products, ProudctsSchema } from "src/schemas/products/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProudctsSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProudctsSchema },
    ]),
  ],
})
export class DbProductsModule {}
