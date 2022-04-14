import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import Fetcher from '../utils/fetcher'
import remapObject from '../utils/remap-object'

/**
 * Returns an individual transaction, fetched by its id.
 *
 * @see https://docs.monzo.com/#retrieve-transaction
 */
export const getTransaction = async <
  E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
>(
  accessToken: string,
  { transactionId, expand }: MonzoAPI.Transactions.GetTransactionParams<E>
): Promise<Monzo.Transactions.ExpandedTransaction<E>> =>
  new Fetcher(accessToken)
    .withQuery({ 'expand[]': expand })
    .get<{ transaction: Monzo.Transactions.ExpandedTransaction<E> }>(
      `transactions/${transactionId}`
    )
    .then(({ transaction }) => transaction)

/**
 * Returns a list of transactions on the user’s account.
 *
 * @see https://docs.monzo.com/#list-transactions
 */
export const getTransactions = async <
  E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
>(
  accessToken: string,
  {
    accountId,
    expand,
    limit,
    since,
    before,
  }: MonzoAPI.Transactions.GetTransactionsParams<E>
): Promise<Monzo.Transactions.ExpandedTransaction<E>[]> =>
  new Fetcher(accessToken)
    .withQuery({
      account_id: accountId,
      'expand[]': expand,
      limit,
      since,
      before,
    })
    .get<{ transactions: Monzo.Transactions.ExpandedTransaction<E>[] }>(
      `transactions`
    )
    .then(({ transactions }) => transactions)

/**
 * Update a transaction's metadata.
 *
 * NOTE:
 *
 * It seems Monzo's documentation is out-of-date, and only the notes metadata
 * param can be updated. Attempting to update any other field will result in no
 * changes to the transaction object returned by Monzo.
 *
 * Keep in mind that the notes parameter will be seen on the app by the user,
 * under each transaction's name, so attempting to store a stringified object or
 * similar structure is not a good solution.
 *
 * Refer to the safelyAnnotateTransaction method to update the notes directly.
 *
 * @see https://docs.monzo.com/#annotate-transaction
 */
export const annotateTransaction: AuthedEndpoint<
  MonzoAPI.Transactions.AnnotateTransactionParams,
  Monzo.Transactions.Transaction
> = async (accessToken, { transactionId, prefix = '', metadata }) =>
  new Fetcher(accessToken)
    .withFormData(remapObject(metadata, (k) => `metadata[${prefix}${k}]`))
    .patch<{ transaction: Monzo.Transactions.Transaction }>(
      `transactions/${transactionId}`
    )
    .then(({ transaction }) => transaction)

/**
 * Update a transaction's notes.
 */
export const safelyAnnotateTransaction: AuthedEndpoint<
  MonzoAPI.Transactions.SafelyAnnotateTransactionParams,
  Monzo.Transactions.Transaction
> = async (accessToken, { transactionId, notes }) =>
  annotateTransaction(accessToken, {
    transactionId,
    metadata: {
      notes: typeof notes === 'string' ? notes : notes.join('\n'),
    },
  })
