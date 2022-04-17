/**
 * An authed endpoint requires the access token as its first argument.
 */
export type AuthedEndpoint<P extends {}, R> = (
  accessToken: string,
  params: P
) => Promise<R>
export type Endpoint<P extends {}, R> = (params: P) => Promise<R>
