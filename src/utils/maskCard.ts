function maskCardNumber(cardNumber: string): string {
  return cardNumber.replace(/^[\d-\s]+(?=\d{4})/, "************");
}
export default maskCardNumber;
