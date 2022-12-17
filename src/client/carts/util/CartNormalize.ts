 
export class CartNormalize {
  date: number;

  customerRef: string;

  status: number;
  _id?: any;

  items: [
    {
      productRefId: {
        _id: string;
        name: string;
        categoryRef: string;
        price: number;
        imgUrl: string;
        description: string;
        quantity: number;
      };
      _id: string;
    }
  ];
}
