import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentSchema } from "src/schemas/payment/payment.schema";
import { PaymentService } from "src/services/payment/payment.service";
import { PaymentController } from "./payment.controller";

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
