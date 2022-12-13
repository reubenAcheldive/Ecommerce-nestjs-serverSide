import { Module } from '@nestjs/common';
import { CatagoriesAndCitiesModule } from '../categoriesAndCities/CategoriesAndCities.module';

import { CategoryController } from './category/category.controller';

@Module({
  imports: [
    CatagoriesAndCitiesModule
  ],
  controllers: [CategoryController]
})
export class AdminModule { }
