import { Monzo } from '..'
import { Pagination } from './pagination'

export type GetTransactionParams<
  E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
> = {
  transactionId: string
  expand?: E
}

export type GetTransactionsParams<
  E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
> = Pagination & {
  accountId: string
  expand?: E
}

export type AnnotateTransactionParams = {
  /** The transaction to be annotated. */
  transactionId: string
  /**
   * You may specify a prefix to be prepended to the metadata fields to prevent
   * collisions with existing fields owned by other services.
   * @example 'my-app-'
   */
  prefix?: string
  /**
   * Include each key you would like to modify. To delete a key, set its value
   * to an empty string.
   */
  metadata: Record<string, string | number | boolean>
}

export type SafelyAnnotateTransactionParams = {
  /** The transaction to be annotated. */
  transactionId: string
  /**
   * A string or an array of strings which will be joined with a line break.
   */
  notes: string | string[]
}
