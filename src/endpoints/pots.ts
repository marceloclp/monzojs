import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import createRequest from '../utils/create-request'

/**
 * Returns a list of pots owned by the currently authorised user that are
 * associated with the specified account.
 *
 * @see https://docs.monzo.com/#list-pots
 */
export const getPots: AuthedEndpoint<
  MonzoAPI.Pots.GetPotsParams,
  Monzo.Pot[]
> = async (accessToken, { accountId }) =>
  createRequest(accessToken)
    .withQuery({ current_account_id: accountId })
    .get<{ pots: Monzo.Pot[] }>(`pots`)
    .then(({ pots }) => pots)

/**
 * Move money from an account owned by the currently authorised user into one of
 * their pots.
 *
 * @see https://docs.monzo.com/#deposit-into-a-pot
 */
export const depositIntoPot: AuthedEndpoint<
  MonzoAPI.Pots.DepositIntoPotParams,
  Monzo.Pot
> = async (accessToken, { potId, accountId, amount, dedupeId }) =>
  createRequest(accessToken)
    .withFormData({
      source_account_id: accountId,
      amount: amount,
      dedupe_id: dedupeId,
    })
    .put(`pots/${potId}/deposit`)

/**
 * Move money from a pot owned by the currently authorised user into one of
 * their accounts.
 *
 * @see https://docs.monzo.com/#withdraw-from-a-pot
 */
export const withdrawFromPot: AuthedEndpoint<
  MonzoAPI.Pots.WithdrawFromPotParams,
  Monzo.Pot
> = async (accessToken, { potId, accountId, amount, dedupeId }) =>
  createRequest(accessToken)
    .withFormData({
      destination_account_id: accountId,
      amount: amount,
      dedupe_id: dedupeId,
    })
    .put(`pots/${potId}/withdraw`)
