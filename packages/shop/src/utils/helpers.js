import currency from "currency.js"

import config from "./config"

export const formatCurrency = (value) =>
  currency(parseFloat(+value), {
    symbol: `${config.currency} `,
    separator: ",",
    formatWithSymbol: true,
    precision: 0,
  }).format()

export const log = (value) => console.log(value) // eslint-disable-line
