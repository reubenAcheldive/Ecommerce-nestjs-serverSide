import {
    Controller, Get,
    Res
} from '@nestjs/common';
import { Response } from 'express';
import { GeneratorPDfService } from 'src/services/PDF/generatorPDf.service';



@Controller('file')
export class FileController {

    constructor(private generatorPDfService: GeneratorPDfService) {

    }

    @Get('/pdf')
    async getPDF(
        @Res() res: Response,
    ): Promise<void> {


        // res.set({
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment; filename=example.pdf',
        //     'Content-Length': buffer.length,
        // })

        try {
          
        } catch (error) {
            console.log(error);

        }
        // res.end(buffer)
    }

}