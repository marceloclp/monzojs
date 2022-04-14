import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import Fetcher from '../utils/fetcher'

/**
 * Returns balance information for a specific account.
 *
 * @see https://docs.monzo.com/#read-balance
 */
export const getBalance: AuthedEndpoint<
  MonzoAPI.Balance.GetBalanceParams,
  Monzo.Balance
> = async (accessToken, { accountId }) =>
  new Fetcher(accessToken).withQuery({ account_id: accountId }).get(`balance`)
