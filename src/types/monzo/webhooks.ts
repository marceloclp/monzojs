/**
 * Webhooks allow your application to receive real-time, push notification of
 * events in an account.
 */
export type Webhook = {
  account_id: string
  id: string
  url: string
}
