export interface PaymentRequest {
  readonly fileId: string;
  readonly amount: number;
  readonly currency: string;
}

export interface PaymentReceipt {
  readonly transactionId: string;
  readonly status: 'succeeded' | 'pending' | 'failed';
  readonly paidAt: Date;
}

export interface IPaymentService {
  charge(request: PaymentRequest): Promise<PaymentReceipt>;
  verify(transactionId: string): Promise<PaymentReceipt | undefined>;
}
