const rate = 1018.78

export const btc = {
  name: 'btc',
  calc: (btc) => btc,
  render: (amt) => `${amt} BTC`
}

export const fiat = {
  name: 'fiat',
  calc: (btc) => btc * rate,
  render: (amt) => `$${amt.toFixed(2)}`
}
