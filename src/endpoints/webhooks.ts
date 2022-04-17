import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import createRequest from '../utils/create-request'

/**
 * List the webhooks your application has registered on an account.
 *
 * @see https://docs.monzo.com/#list-webhooks
 */
export const getWebhooks: AuthedEndpoint<
  MonzoAPI.Webhooks.GetWebhookParams,
  Monzo.Webhook[]
> = async (accessToken, { accountId }) =>
  createRequest(accessToken)
    .withQuery({ account_id: accountId })
    .get<{ webhooks: Monzo.Webhook[] }>(`webhooks`)
    .then(({ webhooks }) => webhooks)

/**
 * Register a webhook.
 *
 * Each time a matching event occurs, Monzo will make a POST call to the URL you
 * provide. If the call fails, we will retry up to a maximum of 5 attempts, with
 * exponential backoff.
 *
 * @see https://docs.monzo.com/#registering-a-webhook
 */
export const createWebhook: AuthedEndpoint<
  MonzoAPI.Webhooks.CreateWebhookParams,
  Monzo.Webhook
> = async (accessToken, { accountId, url }) =>
  createRequest(accessToken)
    .withFormData({ account_id: accountId, url: url })
    .post<{ webhook: Monzo.Webhook }>(`webhooks`)
    .then(({ webhook }) => webhook)

/**
 * Delete a webhook.
 * 
 * This will stop Monzo from sending notifications to the webhook's url.
 *
 * @see https://docs.monzo.com/#deleting-a-webhook
 */
export const deleteWebhook: AuthedEndpoint<
  MonzoAPI.Webhooks.DeleteWebhookParams,
  {}
> = async (accessToken, { webhookId }) =>
  createRequest(accessToken).post<{}>(`webhooks/${webhookId}`)
