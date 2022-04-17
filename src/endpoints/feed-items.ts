import { Monzo, MonzoAPI } from '../types'
import createRequest from '../utils/create-request'
import remapObject from '../utils/remap-object'

/**
 * Creates a new feed item on the user’s feed.
 *
 * @see https://docs.monzo.com/#create-feed-item
 */
export const createFeedItem = async <T extends Monzo.FeedItems.Types = 'basic'>(
  accessToken: string,
  { accountId, type, url, params }: MonzoAPI.FeedItems.CreateFeedItemParams<T>
): Promise<{}> =>
  createRequest(accessToken)
    .withFormData({
      account_id: accountId,
      type: type,
      url: url,
      ...remapObject(
        type === 'basic' &&
          (({
            title,
            titleColor,
            imageUrl,
            backgroundColor,
            bodyColor,
            body,
          }) => ({
            title: title,
            title_color: titleColor,
            image_url: imageUrl,
            background_color: backgroundColor,
            body_color: bodyColor,
            body: body,
          }))(params),
        (k) => `params[${k}]`
      ),
    })
    .post<{}>(`feed`)
