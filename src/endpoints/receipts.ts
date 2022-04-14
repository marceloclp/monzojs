import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import Fetcher from '../utils/fetcher'

/**
 * Retrieve a receipt from its external id.
 *
 * @see https://docs.monzo.com/#retrieve-receipt
 */
export const getReceipt: AuthedEndpoint<
  MonzoAPI.Receipts.GetReceiptParams,
  Monzo.Receipts.Receipt
> = async (accessToken, { externalId }) =>
  new Fetcher(accessToken)
    .withQuery({ external_id: externalId })
    .get<{ receipt: Monzo.Receipts.Receipt }>(`transaction-receipts`)
    .then(({ receipt }) => receipt)

/**
 * Attach a receipt to a transaction.
 *
 * @see https://docs.monzo.com/#create-receipt
 */
export const createReceipt: AuthedEndpoint<
  MonzoAPI.Receipts.CreateReceiptParams,
  {}
> = async (accessToken, { receipt }) =>
  new Fetcher(accessToken).withJSON(receipt).put<{}>(`transaction-receipts`)

/**
 * Update an existing receipt by its external id.
 *
 * @see https://docs.monzo.com/#create-receipt
 * @see https://docs.monzo.com/#delete-receipt
 */
export const updateReceipt: AuthedEndpoint<
  MonzoAPI.Receipts.UpdateReceiptParams,
  {}
> = async (accessToken, { receipt }) =>
  new Fetcher(accessToken).withJSON(receipt).put<{}>(`transaction-receipts`)

/**
 * Delete a receipt based on its external id.
 *
 * @see https://docs.monzo.com/#delete-receipt
 */
export const deleteReceipt: AuthedEndpoint<
  MonzoAPI.Receipts.DeleteReceiptParams,
  {}
> = async (accessToken, { externalId }) =>
  new Fetcher(accessToken)
    .withJSON({ external_id: externalId })
    .delete<{}>(`transaction-receipts`)
