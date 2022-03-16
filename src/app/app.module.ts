import { CatagoriesAndCitiesModule } from './../controllers/categoriesAndCities/CategoriesAndCities.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/controllers/userAuthController/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/shopping'), UserModule, CatagoriesAndCitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
