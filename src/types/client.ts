import { Monzo, MonzoAPI } from '.'
import { Endpoint } from './endpoints'

export interface IMonzoClient {
  /**
   * Returns a list of accounts owned by the currently authorised user.
   *
   * @see https://docs.monzo.com/#list-accounts
   */
  getAccounts<T extends Monzo.Accounts.Types>(
    params: MonzoAPI.Accounts.GetAccountsParams<T>
  ): Promise<Monzo.Accounts.GetAccount<T>[]>

  /**
   * The first step when uploading an attachment is to obtain a temporary URL to
   * which the file can be uploaded.
   *
   * @see https://docs.monzo.com/#upload-attachment
   */
  uploadAttachment: Endpoint<
    MonzoAPI.Attachments.UploadAttachmentParams,
    Monzo.Attachments.UploadedFile
  >

  /**
   * Register an existing attachment against a transaction.
   *
   * @see https://docs.monzo.com/#register-attachment
   */
  registerAttachment: Endpoint<
    MonzoAPI.Attachments.RegisterAttachmentParams,
    Monzo.Attachments.Attachment
  >

  /**
   * Remove an attachment by id.
   *
   * @see https://docs.monzo.com/#deregister-attachment
   */
  deregisterAttachment: Endpoint<
    MonzoAPI.Attachments.DeregisterAttachmentParams,
    {}
  >

  /**
   * Returns balance information for a specific account.
   *
   * @see https://docs.monzo.com/#read-balance
   */
  getBalance: Endpoint<MonzoAPI.Balance.GetBalanceParams, Monzo.Balance>

  /**
   * Creates a new feed item on the user’s feed.
   *
   * @see https://docs.monzo.com/#create-feed-item
   */
  createFeedItem<T extends Monzo.FeedItems.Types = 'basic'>(
    params: MonzoAPI.FeedItems.CreateFeedItemParams<T>
  ): Promise<{}>

  /**
   * Returns a list of pots owned by the currently authorised user that are
   * associated with the specified account.
   *
   * @see https://docs.monzo.com/#list-pots
   */
  getPots: Endpoint<MonzoAPI.Pots.GetPotsParams, Monzo.Pot[]>

  /**
   * Move money from an account owned by the currently authorised user into one of
   * their pots.
   *
   * @see https://docs.monzo.com/#deposit-into-a-pot
   */
  depositIntoPot: Endpoint<MonzoAPI.Pots.DepositIntoPotParams, Monzo.Pot>

  /**
   * Move money from a pot owned by the currently authorised user into one of
   * their accounts.
   *
   * @see https://docs.monzo.com/#withdraw-from-a-pot
   */
  withdrawFromPot: Endpoint<MonzoAPI.Pots.WithdrawFromPotParams, Monzo.Pot>

  /**
   * Retrieve a receipt from its external id.
   *
   * @see https://docs.monzo.com/#retrieve-receipt
   */
  getReceipt: Endpoint<
    MonzoAPI.Receipts.GetReceiptParams,
    Monzo.Receipts.Receipt
  >

  /**
   * Attach a receipt to a transaction.
   *
   * @see https://docs.monzo.com/#create-receipt
   */
  createReceipt: Endpoint<MonzoAPI.Receipts.CreateReceiptParams, {}>

  /**
   * Update an existing receipt by its external id.
   *
   * @see https://docs.monzo.com/#create-receipt
   * @see https://docs.monzo.com/#delete-receipt
   */
  updateReceipt: Endpoint<MonzoAPI.Receipts.UpdateReceiptParams, {}>

  /**
   * Delete a receipt based on its external id.
   *
   * @see https://docs.monzo.com/#delete-receipt
   */
  deleteReceipt: Endpoint<MonzoAPI.Receipts.DeleteReceiptParams, {}>

  /**
   * Returns an individual transaction, fetched by its id.
   *
   * @see https://docs.monzo.com/#retrieve-transaction
   */
  getTransaction<
    E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
  >(
    params: MonzoAPI.Transactions.GetTransactionParams<E>
  ): Promise<Monzo.Transactions.ExpandedTransaction<E>>

  /**
   * Returns a list of transactions on the user’s account.
   *
   * @see https://docs.monzo.com/#list-transactions
   */
  getTransactions<
    E extends Monzo.Transactions.ExpandableFields[] | undefined = undefined
  >(
    params: MonzoAPI.Transactions.GetTransactionsParams<E>
  ): Promise<Monzo.Transactions.ExpandedTransaction<E>[]>

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
  annotateTransaction: Endpoint<
    MonzoAPI.Transactions.AnnotateTransactionParams,
    Monzo.Transactions.Transaction
  >

  /**
   * Update a transaction's notes.
   */
  safelyAnnotateTransaction: Endpoint<
    MonzoAPI.Transactions.SafelyAnnotateTransactionParams,
    Monzo.Transactions.Transaction
  >

  /**
   * List the webhooks your application has registered on an account.
   *
   * @see https://docs.monzo.com/#list-webhooks
   */
  getWebhooks: Endpoint<MonzoAPI.Webhooks.GetWebhookParams, Monzo.Webhook[]>

  /**
   * Register a webhook.
   *
   * Each time a matching event occurs, Monzo will make a POST call to the URL you
   * provide. If the call fails, we will retry up to a maximum of 5 attempts, with
   * exponential backoff.
   *
   * @see https://docs.monzo.com/#registering-a-webhook
   */
  createWebhook: Endpoint<MonzoAPI.Webhooks.CreateWebhookParams, Monzo.Webhook>

  /**
   * Delete a webhook.
   *
   * This will stop Monzo from sending notifications to the webhook's url.
   *
   * @see https://docs.monzo.com/#deleting-a-webhook
   */
  deleteWebhook: Endpoint<MonzoAPI.Webhooks.DeleteWebhookParams, {}>
}
