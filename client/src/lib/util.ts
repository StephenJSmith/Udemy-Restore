export const currencyFormat = (amount: number) => 
  `$${(amount / 100).toFixed(2)}`;