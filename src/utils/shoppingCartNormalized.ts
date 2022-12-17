import { ICart } from "src/dtos/carts/carts.dto";

export function shoppingCartNormalizedInfo(shoppingCartInfo: ICart[]) {
  return shoppingCartInfo.map(({ customerRef, _id, date }: ICart) => {
    return {
      id: _id,
      customerRef: customerRef[0],
      date,
    };
  });
}
