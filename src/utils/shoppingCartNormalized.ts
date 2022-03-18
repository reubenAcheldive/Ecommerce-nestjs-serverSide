import { ICart } from "src/Dto/carts/carts.dto";

export function shoppingCartNormalizedInfo(shoppingCartInfo: ICart[]) {
  return shoppingCartInfo.map(({ customerRef, _id, date }: ICart) => {
    return {
      id: _id,
      customerRef: customerRef[0],
      date,
    };
  });
}
