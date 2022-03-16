import { Schema } from "mongoose";
import { ICities } from "src/Dto/cities/cities.dto";
export const CitiesSchema = new Schema<ICities>({
  cities:[String],
});
