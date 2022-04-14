import { Monzo, MonzoAPI } from '../types'
import Fetcher from '../utils/fetcher'

/**
 * Returns a list of accounts owned by the currently authorised user.
 *
 * @see https://docs.monzo.com/#list-accounts
 */
export const getAccounts = async <
  T extends Monzo.Accounts.Types = Monzo.Accounts.Types
>(
  accessToken: string,
  { accountType }: MonzoAPI.Accounts.GetAccountsParams<T>
): Promise<Monzo.Accounts.GetAccount<T>[]> =>
  new Fetcher(accessToken)
    .withQuery({ account_type: accountType })
    .get<{ accounts: Monzo.Accounts.GetAccount<T>[] }>(`accounts`)
    .then(({ accounts }) => accounts)
