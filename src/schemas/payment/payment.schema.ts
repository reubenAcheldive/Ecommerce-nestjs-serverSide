import { Schema, model } from "mongoose";
import { PaymentSchemaDto } from "src/Dto/payment/payment.dto";
export const PaymentSchema = new Schema<PaymentSchemaDto>({

  cartRef: { type: String, required: true, ref: "Carts" },
  customerRef: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cvc: { type: String, required: true },
  expiredDate: { type: String, required: true },
  name: { type: String, required: true },
});
