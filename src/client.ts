import {
  annotateTransaction,
  createFeedItem,
  createReceipt,
  createWebhook,
  deleteReceipt,
  deleteWebhook,
  depositIntoPot,
  deregisterAttachment,
  getAccounts,
  getBalance,
  getPots,
  getReceipt,
  getTransaction,
  getTransactions,
  getWebhooks,
  registerAttachment,
  updateReceipt,
  uploadAttachment,
  withdrawFromPot,
} from './endpoints'
import { IMonzoClient } from './types/client'

const endpoints = {
  getAccounts,
  uploadAttachment,
  registerAttachment,
  deregisterAttachment,
  getBalance,
  createFeedItem,
  getPots,
  depositIntoPot,
  withdrawFromPot,
  getReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  getTransaction,
  getTransactions,
  annotateTransaction,
  getWebhooks,
  createWebhook,
  deleteWebhook,
}
type Endpoints = keyof typeof endpoints
const createCallableEndpoint =
  (accessToken: string, endpoint: Endpoints) => (params: unknown) =>
    (endpoints[endpoint] as Function)(accessToken, params)

export default function MonzoClient(accessToken: string): IMonzoClient {
  const callableEndpoints = Object.keys(endpoints).map((name) => [
    name,
    createCallableEndpoint(accessToken, name as Endpoints),
  ])
  return Object.fromEntries(callableEndpoints)
}
