import {
  IPaymentService,
  PaymentRequest,
  PaymentReceipt,
} from './IPaymentService';

export class InMemoryPaymentService implements IPaymentService {
  private transactions = new Map<string, PaymentReceipt>();

  async charge(request: PaymentRequest): Promise<PaymentReceipt> {
    const receipt: PaymentReceipt = {
      transactionId: `txn_${Date.now()}`,
      status: 'succeeded',
      paidAt: new Date(),
    };
    this.transactions.set(receipt.transactionId, receipt);
    return receipt;
  }

  async verify(transactionId: string): Promise<PaymentReceipt | undefined> {
    return this.transactions.get(transactionId);
  }
}
