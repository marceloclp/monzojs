export type Types = 'basic'

export type BasicParams = {
  /** The title to display. */
  title: string
  /**
   * URL of the image to display. This will be displayed as an icon in
   * the feed, and on the expanded page if no url has been provided.
   */
  image_url: string
  /**
   * Hex value for the background colour of the feed item in the format
   * #RRGGBB. Defaults to to standard app colours (ie. white background).
   */
  background_color: string
  /**
   * Hex value for the colour of the body text in the format #RRGGBB.
   * Defaults to standard app colours.
   */
  body_color: string
  /**
   * Hex value for the colour of the title text in the format #RRGGBB.
   * Defaults to standard app colours.
   */
  title_color: string
  /** The body text of the feed item. */
  body: string
}

export type Params<T extends Types = 'basic'> = {
  basic: BasicParams
}[T]
