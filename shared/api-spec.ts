// ===============================
// SnapSend v1 API Spec (MVP)
// ===============================

/**
 * 1. Create Stripe Checkout Session
 */
export type CreatePaymentSessionRequest = {
  filename: string
  filesize: number // bytes
}

export type CreatePaymentSessionResponse = {
  sessionUrl: string // redirect user here to complete payment
}


/**
 * 2. Upload File (after successful payment)
 * Assumes the frontend POSTs FormData with file contents.
 */
export type UploadFileRequestHeaders = {
  authorization: `Bearer ${string}` // from Stripe session or backend
}

export type UploadFileResponse = {
  fileId: string
  expiresAt: string // ISO timestamp
  downloadUrl: string // full link with token
}


/**
 * 3. Get Download Metadata
 * (called when user visits a link, to preview or confirm before downloading)
 */
export type GetDownloadMetadataResponse = {
  fileId: string
  filename: string
  size: number // bytes
  expiresAt: string // ISO timestamp
  isExpired: boolean
  expiredAt?: string // if expired
}


/**
 * 4. Download File
 * (triggers download and deletion if link is valid)
 * Errors if expired or already used.
 */
export type DownloadFileParams = {
  fileId: string
  token: string // included in the link
}


/**
 * 5. Error format (shared across all endpoints)
 */
export type APIErrorResponse = {
  error: string
  details?: string
}
