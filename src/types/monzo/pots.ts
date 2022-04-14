/**
 * A pot is a place to keep some money separate from the main spending account.
 *
 * @see https://docs.monzo.com/#pots
 */
export type Pot = {
  id: string
  name: string
  style: string
  balance: number
  currency: string
  goal_amount?: number
  type: string
  product_id: string
  current_account_id: string
  cover_image_url: string
  isa_wrapper: string
  round_up: boolean
  round_up_multiplier: null | number
  is_tax_pot: boolean
  created: string
  updated: string
  deleted: boolean
  locked: boolean
  charity_id: string
  available_for_bills: boolean
  has_virtual_cards: boolean
}
