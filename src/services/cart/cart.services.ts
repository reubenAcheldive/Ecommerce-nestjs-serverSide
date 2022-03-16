import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import {Carts,CartDucument} from '../../schemas/carts/carts.schema'
@Injectable()
export class CartServices { 
    constructor(@InjectModel(Carts.name) private cartDb:Model<CartDucument>){}



    
}