import { Monzo } from '..'

export type BasicFeedItem = {
  /** The title to display. */
  title: string
  /**
   * Hex value for the colour of the title text in the format #RRGGBB.
   * Defaults to standard app colours.
   */
  titleColor: string
  /**
   * URL of the image to display. This will be displayed as an icon in
   * the feed, and on the expanded page if no url has been provided.
   */
  imageUrl: string
  /**
   * Hex value for the background colour of the feed item in the format
   * #RRGGBB. Defaults to to standard app colours (ie. white background).
   */
  backgroundColor: string
  /**
   * Hex value for the colour of the body text in the format #RRGGBB.
   * Defaults to standard app colours.
   */
  bodyColor: string
  /** The body text of the feed item. */
  body: string
}

export type CreateFeedItemParams<T extends Monzo.FeedItems.Types = 'basic'> = {
  /** The account to create a feed item for. */
  accountId: string
  /** Type of feed item. Currently only basic is supported. */
  type?: T
  /**
   * A URL to open when the feed item is tapped. If no URL is provided,
   * the app will display a fallback view based on the title & body.
   */
  url?: string
  /**
   * Each type of feed item supports customisation with a specific list
   * of params.
   */
  params: {
    basic: BasicFeedItem
  }[T]
}
