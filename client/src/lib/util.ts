import { PaymentSummary, ShippingAddress } from "../app/models/order";

export const currencyFormat = (amount: number) => 
  `$${(amount / 100).toFixed(2)}`;

export const filterEmptyValues = (values: object) => {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' 
        && value !== null 
        && value !== undefined
        && value.length !== 0
    )
  )
}

export const formatAddressString = (address: ShippingAddress) => {
  return `${address?.name}, ${address?.line1}, ${address?.city}, 
    ${address?.state}, ${address?.postal_code}, ${address?.country}`;
}

export const formatPaymentString = (payment: PaymentSummary) => {
  return `${payment?.brand?.toUpperCase()}, **** **** **** ${payment?.last4}, 
    Exp: ${payment?.exp_month}/${payment?.exp_year}`;
}