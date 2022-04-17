import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import createRequest from '../utils/create-request'

/**
 * Returns balance information for a specific account.
 *
 * @see https://docs.monzo.com/#read-balance
 */
export const getBalance: AuthedEndpoint<
  MonzoAPI.Balance.GetBalanceParams,
  Monzo.Balance
> = async (accessToken, { accountId }) =>
  createRequest(accessToken).withQuery({ account_id: accountId }).get(`balance`)
