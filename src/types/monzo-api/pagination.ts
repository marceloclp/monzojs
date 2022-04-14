/**
 * Endpoints which enumerate objects support time-based and cursor-based
 * pagination.
 *
 * @see https://docs.monzo.com/#pagination
 */
export type Pagination = {
  /**
   * Number of results per page, with a limit of 100.
   */
  limit?: number
  /**
   * An RFC 3339-encoded timestamp or an object id.
   * @example '2009-11-10T23:00:00Z'
   * @example 'tx_00008zhJ3kE6c8kmsGUKgn'
   */
  since?: string
  /**
   * An RFC 3339 encoded-timestamp.
   * @example '2009-11-10T23:00:00Z'
   */
  before?: string
}
