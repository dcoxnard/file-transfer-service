// backend/src/controllers/paymentController.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { paymentService } from '../services';

export const createPaymentSession = async (req: Request, res: Response) => {
  const { fileId, amount, currency } = req.body;

  if (!fileId || !amount || !currency) {
    return res.status(400).json({ error: 'Missing required fields: fileId, amount, currency' });
  }

  try {
    const receipt = await paymentService.charge({ fileId, amount, currency });

    return res.status(200).json({
      transactionId: receipt.transactionId,
      status: receipt.status,
      paidAt: receipt.paidAt,
    });
  } catch (err) {
    console.error('Error creating payment session:', err);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    return res.status(400).json({ error: 'Missing transaction ID' });
  }

  try {
    const receipt = await paymentService.verify(transactionId);
    if (!receipt) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.status(200).json(receipt);
  } catch (err) {
    console.error('Error verifying payment:', err);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
};