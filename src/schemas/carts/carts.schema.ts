import { ICart } from 'src/Dto/carts/carts.dto';

import * as mongoose from "mongoose";



export const CartSchema = new mongoose.Schema <ICart>({
  customerRef: { type: String, required: true },
  date: { type: Number, required: true },
  status: { type: Number, required: true },

  cartItems: [{
    quantity: Number,
    products: { type: String, ref: "Products" },
  }],
});



