import {
  IsString,
  IsDate,
  IsOptional,
  IsDateString,
  IsNumberString,
  isArray,
  IsArray,
  IsObject,
  isString,
} from "class-validator";

export class OrderSchemaDto {
  @IsOptional()
  @IsString()
  _id?: string;
  @IsString()
  cartRef: string;
  @IsString()
  customerRef: string;
  @IsString()
  dateDelivery: string;
  @IsNumberString()
  @IsOptional()
  totalPrice: number;
  @IsOptional()
  @IsString()
  dateOfCreateOrder: string;
  @IsObject()
  addressRef: {
    city: string;
    streetAddress: string;
    entering: number;
    homeNumber: number;
    departmentNumber: number;
  };

  @IsObject()
  paymentRef: {
    idPayment: string;
    cardNumberMask: string;
  };
  @IsArray()
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
  ];
}
