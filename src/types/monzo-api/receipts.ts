import { Monzo } from '..'

export type GetReceiptParams = {
  externalId: string
}

export type CreateReceiptParams = {
  receipt: Monzo.Receipts.Receipt
}

export type UpdateReceiptParams = {
  receipt: Partial<Monzo.Receipts.Receipt> & { external_id: string }
}

export type DeleteReceiptParams = {
  externalId: string
}
