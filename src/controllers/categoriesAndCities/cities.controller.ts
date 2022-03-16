import { Controller, Get } from "@nestjs/common";
import { CitiesService } from "src/services/categories/cities.services";


@Controller("/api/store")
export class CitiesContoller {
  constructor(private citiesService: CitiesService) {}
@Get("/cities")
  async getCategories() {
   const [{cities}] = await this.citiesService.fetchCities();
   return cities
  }
}
