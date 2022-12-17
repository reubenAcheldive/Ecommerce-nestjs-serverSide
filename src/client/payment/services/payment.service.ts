import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaymentSchemaDto } from "../../../dtos/payment/payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel("payments") private paymentDb: Model<PaymentSchemaDto>
  ) {}
  // get payment details
  public async getOnePaymentDetails({ _id }) {
    return await this.paymentDb.findById({ _id });
  }

  public async getAllPaymentDetailsByCustomerId(
    customerRef: Pick<PaymentSchemaDto, "customerRef">
  ) {
    return await this.paymentDb.find({ customerRef });
  }

  public async getPaymentDetailsByCustomerId(customerRef: string) {
    return await this.paymentDb.find({ customerRef });
  }
  public async createNewPayment(payload: PaymentSchemaDto) {
    return await (await this.paymentDb.create(payload)).save();
  }

  public async updatePaymentDetailsByCustomerId(
    _id: string,
    payload: PaymentSchemaDto
  ) {
    const { cardNumber, cvc, cartRef, expiredDate, customerRef, name } =
      payload;

    const getPayment = await this.paymentDb.findByIdAndUpdate(
      { _id },
      { $set: { cardNumber, cvc, cartRef, expiredDate, customerRef, name } }
    );
    await getPayment.save({ validateBeforeSave: true });
    return await this.getOnePaymentDetails({ _id });
  }

  public async deletePaymentById(_id: string) {
    await this.paymentDb.findByIdAndRemove({ _id });
  }

  // update payment by id

  // deleted Payment by id
}
