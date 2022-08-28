import { Controller, Get, Module, Request, Res } from "@nestjs/common";
import { GeneratorPdfService } from "./../../services/PDF/GeneratorPdf.service";
import { Response } from "express";
@Controller("/api/store/get-pdf")
export class GeneratorPDfController {
  constructor(private pdf: GeneratorPdfService) {}

  @Get()
  async getPDF(@Res() res: Response): Promise<any> {
    const buffer = await this.pdf.generatePDF();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=example.pdf",
      "Content-Length": buffer.length,
    });

    res.end(buffer);
  }
}
