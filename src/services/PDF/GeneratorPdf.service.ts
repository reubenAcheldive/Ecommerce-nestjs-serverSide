import { Injectable } from "@nestjs/common";
import * as PDFDocument from "pdfkit";
import * as fs from "fs";
@Injectable()
export class GeneratorPdfService {
  async generatePDF(): Promise<any> {
    try {
    return  fs.writeFileSync("../../../src/files/text.txt", "hello world");
    } catch (error) {
   
    }
  }
}
