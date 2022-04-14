import { Monzo } from '..'

export type Types = 'transaction.created'
export type Event<T extends Types, D> = { type: T; data: D }

// prettier-ignore
export type TransactionCreated = Event<'transaction.created', {
  account_id: string
  amount: number
  created: string
  currency: string
  description: string
  id: string
  category: string
  is_load: boolean
  settled: string
  merchant: Monzo.Transactions.Merchant
}>
