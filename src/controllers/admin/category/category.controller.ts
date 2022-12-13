import { Body, Controller, Get } from '@nestjs/common';
import { ICategories } from 'src/Dto/categories/categories.dto';
import { CategoriesService } from './../../../services/categories/categories.services';

@Controller('category')
export class CategoryController {
    constructor(private CS: CategoriesService) { }
    @Get('/')
    async getCategories(@Body() { nameCategory }: Pick<ICategories, "nameCategory">,) {


        return this.CS.createCategory({ nameCategory });
    }
}
