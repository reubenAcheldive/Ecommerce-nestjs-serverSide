import { IProduct } from "src/Dto/products/products.dto";

interface Items {
  quantity: number;
  productRefId: IProduct;
  _id: string;
}
const calculateTotalPrice = (items: Items[]): number => {
  return items.reduce(
    (a, { quantity, productRefId }) => a + (quantity *= productRefId.price),
    0
  );

  
};
export default calculateTotalPrice;
