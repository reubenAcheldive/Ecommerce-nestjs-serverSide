import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";
@Injectable()
export class OrderServices {
  constructor(@InjectModel("Orders") private orderDb: Model<OrderSchemaDto>) {}

  createNewOrder = async ({
    TotalPrice,
    address,
    fourDigitCreditCard,
    customerRef,
    cityDelivery,
    cartRef,
    DateDelivery,
  }: OrderSchemaDto) => {
    const newOrder = new this.orderDb({
      DateOfCreateOrder: new Date(),
      TotalPrice,
      address,
      fourDigitCreditCard,
      customerRef,
      cityDelivery,
      cartRef,
      DateDelivery,
    });
    return newOrder;
  };

  updateCart = async (idCart: string, status: number) => {
    const cartUpdate = await this.orderDb.findByIdAndUpdate(
      { _id: idCart },
      { $set: { status: status } }
    );
    return cartUpdate;
  };
  getDetailsOrder = async (_id: string) => {
    const getOrder = await this.orderDb.find({ _id });
    console.log({ getOrder });

    return getOrder;
  };

  getAllOrder = async () => {
    const quantityOrders = await this.orderDb.find({});

    return quantityOrders.length;
  };

  getAvailableOrderDate = async () => {
    const date = await this.orderDb
      .aggregate([{ $group: { _id: "$DateDelivery", count: { $sum: 1 } } }])
      .exec();
    const dateAvailable = date
      .filter(({ count, _id }) => {
        if (count < 3) {
          return;
        }
        return count;
      })
      .map(({ _id }) => {
        return _id;
      });
    return dateAvailable;
  };

 async checkDateDelivery (DateDelivery) {
    return await this.orderDb.find({DateDelivery})
  }

  
}
