import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderSchemaDto } from "src/dtos/order/orderSchema.dto";

@Injectable()
export class OrderService {
  constructor(@InjectModel("Orders") private orderDb: Model<OrderSchemaDto>) {}
  async getOrders({ page, limit }: { page: number; limit: number }) {
    const getOrders = await this.orderDb
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.orderDb.find().count();
    return {
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      nextPage: `/admin/order/get-all-order/${page + 1}`,
      prevPage: `/admin/order/get-all-order/${page - 1}`,
      getOrders,
    };
  }
}

