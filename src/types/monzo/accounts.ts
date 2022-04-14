export type Types =
  | 'uk_retail'
  | 'uk_retail_joint'
  | 'uk_monzo_flex'
  | 'uk_monzo_flex_backing_loan'

export type Owner = {
  user_id: string
  preferred_name: string
  preferred_first_name: string
}

/**
 * Accounts represent a store of funds, and have a list of transactions.
 *
 * @see https://docs.monzo.com/#accounts
 */
export type Account<T extends Types = Types> = {
  id: string
  type: T
  closed: boolean
  created: string
  description: string
  currency: string
  country_code: string
  owners: Owner[]
}

export type RetailAccount = Account<'uk_retail' | 'uk_retail_joint'> & {
  account_number: string
  sort_code: string
  // prettier-ignore
  payment_details: Record<'locale_uk', {
    account_number: string
    sort_code: string
  }>
}

export type GetAccount<T extends Types> = T extends
  | 'uk_retail'
  | 'uk_retail_joint'
  ? RetailAccount
  : Account<T>
