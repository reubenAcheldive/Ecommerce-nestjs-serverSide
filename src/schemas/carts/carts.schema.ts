import * as mongoose from "mongoose";
import { ICart } from "src/dtos/carts/carts.dto";

export const CartSchema = new mongoose.Schema<ICart>({
  customerRef: { type: String, required: true },
  date: { type: Number, required: true },
  status: { type: Number, required: true },

  items: [
    {
      quantity: Number,
      productRefId: { type: String, ref: "Products" },
    },
    // _id: { type: mongoose.Types.ObjectId },
  ],
});
