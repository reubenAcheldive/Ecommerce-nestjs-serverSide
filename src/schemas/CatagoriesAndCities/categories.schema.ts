import * as mongoose from "mongoose";
import { ICategoies } from "src/Dto/categories/categories.dto";

export const CategorySchema = new mongoose.Schema<ICategoies>({
  _id: mongoose.Schema.Types.ObjectId,
  nameCategory: String,
});
