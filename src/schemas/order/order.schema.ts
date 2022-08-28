import { Schema, model } from "mongoose";
import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";

export const OrderSchema = new Schema<OrderSchemaDto>({
  cartRef: { type: String, required: true, ref: "Carts" },
  customerRef: { type: String, required: true },
  DateDelivery: { type: Date, required: true },
  TotalPrice: { type: Number, required: true },
  DateOfCreateOrder: { type: Date, required: true },
  address: { type: String, required: true },
  cityDelivery: { type: String, required: true },
  paymentId: { type: String, required: true ,Ref:"Payments"},
});
