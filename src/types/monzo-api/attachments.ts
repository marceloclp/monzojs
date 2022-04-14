export type UploadAttachmentParams = {
  /** The name of the file to be uploaded. */
  fileName: string
  /** The content type of the file. */
  fileType: string
  /** The HTTP Content-Length of the upload request body, in bytes. */
  contentLength: number
}

export type RegisterAttachmentParams = {
  /** The id of the `transaction` to associate the `attachment` with. */
  externalId: string
  /** The URL of the uploaded attachment. */
  fileUrl: string
  /** The content type of the attachment. */
  fileType: string
}

export type DeregisterAttachmentParams = {
  /** The id of the `attachment` to deregister. */
  attachmentId: string
}
