import { Module } from "@nestjs/common";
import { GeneratorPdfService } from "src/services/PDF/GeneratorPdf.service";
import { GeneratorPDfController } from "./GeneratorPDf.controller";

@Module({
  providers: [GeneratorPdfService],
  controllers: [GeneratorPDfController],
})
export class GeneratorPdfModule {}
