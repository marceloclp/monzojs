/**
 * @see https://docs.monzo.com/#balance
 */
export type Balance = {
  /**
   * The currently available balance of the account, as a 64bit integer in minor
   * units of the currency, eg. pennies for GBP, or cents for EUR and USD.
   */
  balance: number
  /**
   * The sum of the currently available balance of the account and the combined
   * total of all the user’s pots.
   */
  total_balance: number
  balance_including_flexible_savings: number
  /** The ISO 4217 currency code. */
  currency: string
  /**
   * The amount spent from this account today (considered from approx 4am
   * onwards), as a 64bit integer in minor units of the currency.
   */
  spend_today: number
  local_currency: string
  local_exchange_rate: number
  local_spend: any[]
}
