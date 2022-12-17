import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentSchema } from "src/schemas/payment/payment.schema";
 
import { PaymentController } from "./controller/payment.controller";
import { PaymentService } from "./services/payment.service";

@Module({
  controllers: [PaymentController],
  imports: [
    MongooseModule.forFeature([
      {
        name: "payments",
        schema: PaymentSchema,
      },
    ]),
  ],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
