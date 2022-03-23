import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { ICities } from "src/Dto/cities/cities.dto";
@Injectable()
export class CitiesService {
  constructor(
    @InjectModel("Cities")   private cities: Model<ICities>
  ) {}

  async fetchCities() {
    return this.cities.find({});
  }
}
