import { Schema } from "mongoose";
import { ICities } from "src/dtos/cities/cities.dto";
 
export const CitiesSchema = new Schema<ICities>({
  cities: [String],
});
