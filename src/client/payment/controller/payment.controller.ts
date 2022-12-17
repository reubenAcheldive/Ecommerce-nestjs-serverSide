import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { IsString } from "class-validator";
import { PaymentSchemaDto } from "../../../dtos/payment/payment.dto";
import { PaymentService } from "../..//payment/services/payment.service";
interface updatePaymentProps {
  data: PaymentSchemaDto;
}
@Controller("api/store/payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post("/")
  async getAllPayments(
    @Body("customerId") customerRef: Pick<PaymentSchemaDto, "customerRef">
  ) {
    if (!customerRef) throw new Error("customerRef is not provider");

    return await this.paymentService.getAllPaymentDetailsByCustomerId(
      customerRef
    );
  }
  @Post("/add-new-payment")
  async addNewPayment(@Body() payload: PaymentSchemaDto) {
    return await this.paymentService.createNewPayment(payload);
  }
  @Patch("/add-new-payment")
  async updatePayment(@Body() payload: PaymentSchemaDto) {
    const { _id } = payload;

    return await this.paymentService.updatePaymentDetailsByCustomerId(
      _id,
      payload
    );
  }
  @Delete(":_id")
  async deleteOnPayment(@Param("_id") _id: string) {
    return await this.paymentService.deletePaymentById(_id);
  }
}
