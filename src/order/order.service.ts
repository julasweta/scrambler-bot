// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderModule } from './order.module';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(
    userId: string,
    item: string,
    quantity: number,
  ): Promise<OrderModule> {
    const createdOrder = new this.orderModel({ userId, item, quantity });
    return await createdOrder.save();
  }
}
