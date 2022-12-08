import { Injectable } from "@nestjs/common";
import * as PDFDocument from 'pdfkit'
import { IOrder, ReceptionOrderContext } from "src/utils/CreateReception";
import * as fs from "fs"
@Injectable()
export class GeneratorPDfService {
  constructor() { }
  async createInvoice(invoice: IOrder) {
    const pdfBuffer: Buffer = await new Promise(resolve => {
      let doc = new PDFDocument({ size: "A4", margin: 50 });

      this.generateHeader(doc);
      this.generateCustomerInformation(doc, invoice);
      this.generateInvoiceTable(doc, invoice );
      this.generateFooter(doc);

      doc.end();
      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
    })
    return pdfBuffer
  }

  async generateHeader(doc: PDFKit.PDFDocument) {
    doc
      .image("logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("ACME Inc.", 110, 57)
      .fontSize(10)
      .text("ACME Inc.", 200, 50, { align: "right" })
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("Israel,TLV,50", 200, 80, { align: "right" })
      .moveDown();
  }

  generateCustomerInformation(doc: PDFKit.PDFDocument, invoice: IOrder) {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Invoice", 50, 160);

    this.generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .text("Invoice Number:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(invoice._id, 150, customerInformationTop)
      .font("Helvetica")
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .text(this.formatDate(new Date()), 150, customerInformationTop + 15)
     
      .text(
        this.formatCurrency(10),
        150,
        customerInformationTop + 30
      )

      .font("Helvetica-Bold")
      .text("Guest", 300, customerInformationTop) // todo
      .font("Helvetica")
      .text(invoice.addressRef.city, 300, customerInformationTop + 15)
      .text(
        invoice.addressRef.city +
        ", " +
        invoice.addressRef.streetAddress +
        ", " +
        invoice.addressRef.departmentNumber,
        300,
        customerInformationTop + 30
      )
      .moveDown();

    this.generateHr(doc, 252);
  }

  generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: IOrder) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    this.generateTableRow(
      doc,
      invoiceTableTop,
      "Item",
      "Description",
      "Unit Cost",
      "Quantity",
      "Line Total"
    );
    this.generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      this.generateTableRow(
        doc,
        position,
        item.productRefId.name,
        item.productRefId.description,
        this.formatCurrency(item.productRefId.price),
       
        item.quantity,
        this.formatCurrency(item.quantity * item.productRefId.price)
      );

      this.generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    this.generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Subtotal",
      "",
      this.formatCurrency(50)
    );

    const paidToDatePosition = subtotalPosition + 20;


    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    this.generateTableRow(
      doc,
      duePosition,
      "",
      "",
      " ",
      "",
      this.formatCurrency(82)
    );
    doc.font("Helvetica");
  }

  generateFooter(doc: PDFKit.PDFDocument) {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }

  generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(unitCost, 280, y, { width: 90, align: "right" })
      .text(quantity, 370, y, { width: 90, align: "right" })
      .text(lineTotal, 0, y, { align: "right" });
  }

  generateHr(doc: PDFKit.PDFDocument, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  formatCurrency(cents:number) {
    return "$" + (cents) ;
  }

  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
  }



}