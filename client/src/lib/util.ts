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