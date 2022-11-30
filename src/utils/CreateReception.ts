import { OrderSchemaDto } from "src/Dto/order/orderSchema.dto";
export interface IOrder extends OrderSchemaDto {
    _id: string;
}

export interface ReceptionOrderContext {
    renderIdOrder: string;
    renderItems: string[];
    renderNameOfBuyer: string;
    renderAddress: string;
    renderPayment: string;
    finishWord: string;
}




// export function ReceptionOrder(order: IOrder):ReceptionOrderContext {
//     const renderIdOrder = `Order id ${order._id}`
//     const renderItems = order.items.map((item, i): string => {
//         return `
//         ${i}) item name : ${item.productRefId.name},
//          quantity : ${item.quantity} ,
//           price : ${item.productRefId.price}
//         `
//     })
//     const renderNameOfBuyer = `Reuben `
//     const renderAddress = ` address to shipment
//     city:${order.addressRef.city}
//     streetAddress:${order.addressRef.streetAddress}
//     entering:${order.addressRef.entering}
//     homeNumber:${order.addressRef.homeNumber}
//     departmentNumber:${order.addressRef.departmentNumber}
//     `
//     const renderPayment = `
//     numberCard:${order.paymentRef.cardNumberMask}
//      `
//     const finishWord = "Thank you for your order"
//     return {
//         renderIdOrder,
//         renderItems,
//         renderNameOfBuyer,
//         renderAddress,
//         renderPayment,
//         finishWord,
//     }
// }



