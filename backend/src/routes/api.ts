import express from 'express'
import multer from 'multer'
import { createPaymentSession, verifyPayment } from '../controllers/paymentController'
import { handleUpload } from '../controllers/uploadController'
import { getFileMetadata, downloadFile } from '../controllers/fileController'

const router = express.Router()
const upload = multer() // Configure storage, limits, etc., as needed

router.post('/payment/session', createPaymentSession)
router.post('/upload', upload.single('file'), handleUpload)
router.get('/file/:fileId/metadata', getFileMetadata)
router.get('/file/:fileId/download', downloadFile)
router.get('/payment/verify/:transactionId', verifyPayment)

export default router