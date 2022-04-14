import { Monzo } from '..'

export type GetAccountsParams<
  T extends Monzo.Accounts.Types = Monzo.Accounts.Types
> = {
  /** Filter by account type. */
  accountType?: T
}
