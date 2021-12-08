import { OrderItemProps } from '@/interfaces/common';

export function renderMessage(data: any) {
  const {
    user,
    shippingAddress,
    paymentMethod,
    itemPrice,
    orderItems,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = data;

  return `
  Name: ${user}\r\n
  shippingAddress ${shippingAddress.address}, ${shippingAddress.city}, ${
    shippingAddress.city
  }, ${shippingAddress.postalCode}, , ${shippingAddress.country} \r\n
  paymentMethod: ${paymentMethod}\r\n
  itemPrice: ${itemPrice} \r\n
  orderItems: 
    ${orderItems
      .map((item: OrderItemProps) => {
        return item.name + ', ' + item.quantity;
      })
      .join(',')} 
  \r\n
  shippingPrice: ${shippingPrice} \r\n
  taxPrice: ${taxPrice} \r\n
  totalPrice: ${totalPrice} \r\n
`;
}
