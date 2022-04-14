import { Monzo, MonzoAPI } from '../types'
import { AuthedEndpoint } from '../types/endpoints'
import Fetcher from '../utils/fetcher'

/**
 * The first step when uploading an attachment is to obtain a temporary URL to
 * which the file can be uploaded.
 *
 * @see https://docs.monzo.com/#upload-attachment
 */
export const uploadAttachment: AuthedEndpoint<
  MonzoAPI.Attachments.UploadAttachmentParams,
  Monzo.Attachments.UploadedFile
> = async (accessToken: string, { fileName, fileType, contentLength }) =>
  new Fetcher(accessToken)
    .withFormData({
      file_name: fileName,
      file_type: fileType,
      content_length: contentLength,
    })
    .post(`attachment/upload`)

/**
 * Register an existing attachment against a transaction.
 *
 * @see https://docs.monzo.com/#register-attachment
 */
export const registerAttachment: AuthedEndpoint<
  MonzoAPI.Attachments.RegisterAttachmentParams,
  Monzo.Attachments.Attachment
> = async (accessToken: string, { externalId, fileUrl, fileType }) =>
  new Fetcher(accessToken)
    .withFormData({
      external_id: externalId,
      file_url: fileUrl,
      file_type: fileType,
    })
    .post<{ attachment: Monzo.Attachments.Attachment }>(`attachment/register`)
    .then(({ attachment }) => attachment)

/**
 * Remove an attachment by id.
 *
 * @see https://docs.monzo.com/#deregister-attachment
 */
export const deregisterAttachment: AuthedEndpoint<
  MonzoAPI.Attachments.DeregisterAttachmentParams,
  {}
> = async (accessToken: string, { attachmentId }) =>
  new Fetcher(accessToken)
    .withFormData({ id: attachmentId })
    .post<{}>(`attachment/deregister`)
