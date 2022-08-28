import { Body, Controller, Get, Patch, Post, Put } from "@nestjs/common";
import { IsString } from "class-validator";
import { PaymentSchemaDto } from "src/Dto/payment/payment.dto";
import { PaymentService } from "src/services/payment/payment.service";
interface updatePaymentProps {
  data: PaymentSchemaDto;
 
}
@Controller("api/store/payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post("/")
  async getAllPayments(@Body("customerId") customerRef: string) {
    if (!customerRef) throw new Error("customerRef is not provider");

    return await this.paymentService.getAllPaymentDetailsByCustomerId(
      customerRef
    );
  }
  @Post("/add-new-payment")
  async addNewPayment(@Body() payload: PaymentSchemaDto) {
    console.log({ payload });
    return await this.paymentService.createNewPayment(payload);
  }
  @Patch("/add-new-payment")
  async updatePayment(@Body() payload: PaymentSchemaDto) {
   const {_id,cardNumber,cvc,cartRef,expiredDate,customerRef,name} = payload;
    return await this.paymentService.updatePaymentDetailsByCustomerId(
     _id,
      payload
    );
  }
}
