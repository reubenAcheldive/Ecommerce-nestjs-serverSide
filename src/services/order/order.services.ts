import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";
import maskCardNumber from "src/utils/maskCard";
import calculateTotalPrice from "src/utils/TotlPrice";
import { CartServices } from "../cart/cart.services";

import { PaymentService } from "../payment/payment.service";
import { AddressService } from "./../address/address.service";
@Injectable()
export class OrderServices {
  constructor(
    @InjectModel("Orders") private orderDb: Model<OrderSchemaDto>,
    private cartServices: CartServices,
    private paymentServices: PaymentService,
    private addressServices: AddressService
  ) {}

  createNewOrder = async ({
    addressRef,
    customerRef,
    paymentRef,
    items,
    cartRef,
    dateDelivery,
  }: OrderSchemaDto) => {
    const payment = await this.paymentServices.getOnePaymentDetails(
      paymentRef.idPayment
    );
    const { totalPrice, dateOfCreateOrder, addresses } =
      await this.otilsForOrder(addressRef, items);

    const createNewOrder = await this.orderDb.create({
      cartRef,
      customerRef,
      paymentRef: {
        idPayment: payment._id,
        cardNumberMask: maskCardNumber(payment.cardNumber),
      },
      totalPrice,
      dateOfCreateOrder,
      addressRef: addresses._id.toString(),
      dateDelivery: String(new Date(dateDelivery)),
      items,
    });
    if (createNewOrder) {
      const updateCart = await this.cartServices.updateCart(cartRef, 2);
      if (updateCart) {
        const createNewCartForCustomer = await this.cartServices.createNewCart(
          customerRef
        );
        return { createNewOrder, createNewCartForCustomer };
      }
    }
  };

  getDetailsOrder = async (_id: string) => {
    const getOrder = await this.orderDb.find({ _id });

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

  private async otilsForOrder(
    addressRef: string,
    items: [
      {
        quantity: number;
        productRefId: {
          _id: string;
          name: string;
          categoryRef: string;
          price: number;
          imgUrl: string;
          description: string;
        };
        _id: string;
      }
    ]
  ) {
    const addresses = await this.addressServices.findAddressesById(addressRef);
    const totalPrice = calculateTotalPrice(items as any).toFixed(2);
    const dateOfCreateOrder = String(new Date());
    return { totalPrice, dateOfCreateOrder, addresses };
  }

  async checkDateDelivery(DateDelivery) {
    return await this.orderDb.find({ DateDelivery });
  }
}

// order
// userRef
//itemList
//cartId
// get current address by address _id
//get current Payment by Payment _id
//close cart to statues 2 and create new Cart
//time close order
//total Price from cart items
//date to shipment
