export type GetWebhookParams = {
  /** The account to list registered webhooks for. */
  accountId: string
}

export type CreateWebhookParams = {
  /** The account to receive notifications for. */
  accountId: string
  /** The URL we will send notifications to. */
  url: string
}

export type DeleteWebhookParams = {
  webhookId: string
}
