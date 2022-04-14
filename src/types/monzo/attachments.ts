/**
 * Images (eg. receipts) can be attached to transactions by uploading these via
 * the attachment API. Once an attachment is registered against a transaction,
 * the image will be shown in the transaction detail screen within the Monzo app.
 *
 * There are two options for attaching images to transactions - either Monzo
 * can host the image, or remote images can be displayed.
 *
 * If Monzo is hosting the attachment the upload process consists of three steps:
 *  1. Obtain a temporary authorised URL to upload the attachment to.
 *  2. Upload the file to this URL.
 *  3. Register the attachment against a transaction.
 *
 * If you are hosting the attachment, you can simply register the attachment
 * with the transaction:
 *  1. Register the attachment against a transaction.
 *
 * @see https://docs.monzo.com/#attachments
 */
export type Attachment = {
  /**
   * The ID of the attachment. This can be used to deregister at a later date.
   */
  id: string
  /** The id of the `user` who owns this `attachment`. */
  user_id: string
  /** The id of the `transaction` to which the `attachment` is attached. */
  external_id: string
  /** The URL at which the `attachment` is available. */
  file_url: string
  /** The file type of the `attachment`. */
  file_type: string
  /** The timestamp in UTC when the attachment was created. */
  created: string
}

/**
 * An uploaded file is returned when an attachment is uploaded to Monzo's
 * internal storage.
 */
export type UploadedFile = {
  /** The URL of the file once it has been uploaded */
  file_url: string
  /** The URL to POST the file to when uploading */
  upload_url: string
}
