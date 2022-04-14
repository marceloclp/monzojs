export type GetPotsParams = {
  /** The account the pots being retriven belong to. */
  accountId: string
}

export type DepositIntoPotParams = {
  /** The id of the pot to deposit into. */
  potId: string
  /** The id of the account to withdraw from. */
  accountId: string
  /**
   * The amount to deposit, as a 64bit integer in minor units of the currency,
   * eg. pennies for GBP, or cents for EUR and USD.
   */
  amount: number
  /**
   * A unique string used to de-duplicate deposits. Ensure this remains static
   * between retries to ensure only one deposit is created.
   */
  dedupeId: string
}

export type WithdrawFromPotParams = {
  /** The id of the pot to withdraw from. */
  potId: string
  /** The id of the account to deposit into. */
  accountId: string
  /**
   * The amount to deposit, as a 64bit integer in minor units of the currency,
   * eg. pennies for GBP, or cents for EUR and USD.
   */
  amount: number
  /**
   * A unique string used to de-duplicate deposits. Ensure this remains static
   * between retries to ensure only one deposit is created.
   */
  dedupeId: string
}
