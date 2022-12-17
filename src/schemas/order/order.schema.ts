import { Schema } from "mongoose";
import { OrderSchemaDto } from "src/dtos/order/orderSchema.dto";

export const OrderSchema = new Schema<OrderSchemaDto>({
  cartRef: { type: String, required: true },
  customerRef: { type: String, required: true },
  dateDelivery: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  dateOfCreateOrder: { type: String, required: true },
  addressRef: {
    city: String,
    streetAddress: String,
    entering: Number,
    homeNumber: Number,
    departmentNumber: Number,
  },

  paymentRef: {
    idPayment: String,
    cardNumberMask: String,
  },
  items: [
    {
      quantity: Number,
      productRefId: {
        _id: String,
        name: String,
        categoryRef: String,
        price: Number,
        imgUrl: String,
        description: String,
      },
      _id: { type: String },
    },
  ],
});
// order

//itemList
//cartId
// get current address by address _id
//get current Payment by Payment _id
//close cart to statues 2 and create new Cart
//time close order
