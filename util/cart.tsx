export function totalItemPrice(items: any) {
  return items.reduce((a: any, c: any) => a + c.quantity * c.price, 0);
}
