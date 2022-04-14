import { Monzo } from '..'
import {
  ExpandableField,
  GetExpandableFields,
  GetExpandedObject,
  GetUnexpandedObject,
} from '../utilities'

type ITransaction = {
  id: string
  created: string
  description: string
  /**
   * The amount of the transaction in minor units of currency. For example
   * pennies in the case of GBP. A negative amount indicates a debit (most card
   * transactions will have a negative amount).
   */
  amount: number
  // ??
  fees: Record<string, number>
  currency: string
  merchant: ExpandableField<string, Merchant>
  notes: string
  metadata: Record<string, string>
  labels: unknown
  attachments: unknown
  international: unknown
  /**
   * The category can be set for each transaction by the user. Over time we
   * learn which merchant goes in which category and auto-assign the category of
   * a transaction.
   *
   * If the user hasn’t set a category, we’ll return the default category of the
   * merchant on this transactions.
   */
  category: Categories
  categories: Record<string, number>
  /**
   * Top-ups to an account are represented as transactions with a positive
   * amount and is_load = true. Other transactions such as refunds, reversals or
   * chargebacks may have a positive amount but is_load = false.
   */
  is_load: boolean
  /**
   * The timestamp at which the transaction settled. In most cases, this happens
   * 24-48 hours after created. If this field is an empty string, the
   * transaction is authorised but not yet “complete"
   */
  settled: string
  local_amount: number
  local_currency: string
  updated: string
  account_id: string
  user_id: string
  // ??
  counterparty: unknown
  scheme: string
  dedupe_id: string
  originator: boolean
  include_in_spending: boolean
  can_be_excluded_from_breakdown: boolean
  can_be_made_subscription: boolean
  can_split_the_bill: boolean
  can_add_to_tab: boolean
  can_match_transactions_in_categorization: boolean
  amount_is_pending: boolean
  // ??
  atm_fees_detailed: unknown
  parent_account_id: string
  /**
   * This is only present on declined transactions!
   */
  // prettier-ignore
  decline_reason?:
    | 'INSUFFICIENT_FUNDS'
    | 'CARD_INACTIVE'
    | 'CARD_BLOCKED'
    | 'INVALID_CVC'
    | 'OTHER'
}

/**
 * Transactions are movements of funds into or out of an account.
 *
 * Negative transactions represent debits (ie. spending money) and positive
 * transactions represent credits (ie. receiving money).
 *
 * @see https://docs.monzo.com/#transactions
 */
export type Transaction = GetUnexpandedObject<ITransaction>

/**
 * Transactions fields that can be expanded by passing the field name to the
 * expanded parameter in order to save a round-trip.
 * 
 * @see https://docs.monzo.com/#expanding-objects
 */
export type ExpandableFields = GetExpandableFields<ITransaction>

/**
 * Returns the transaction with desired fields expanded.
 *
 * @example
 *  type ExpandedTransaction<['merchant']> = Transaction & {
 *    merchant: Merchant | null
 *  }
 * 
 * @see https://docs.monzo.com/#expanding-objects
 */
export type ExpandedTransaction<K extends ExpandableFields[] | undefined = undefined> =
  K extends ExpandableFields[]
    ? GetExpandedObject<ITransaction, K>
    : Transaction

export type Merchant = {
  id: string
  group_id: string
  name: string
  logo: string
  emoji: string
  category: string
  online: boolean
  atm: boolean
  address: Monzo.Address
  disable_feedback: boolean
  suggested_tags: string
  metadata: Record<string, unknown> & {
    suggested_tags?: string
    website?: string
  }
}

export type Categories =
  | 'general'
  | 'eating_out'
  | 'expenses'
  | 'transport'
  | 'cash'
  | 'bills'
  | 'entertainment'
  | 'shopping'
  | 'holidays'
  | 'groceries'
