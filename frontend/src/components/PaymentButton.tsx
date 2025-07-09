import React from 'react';

type Props = {
  file: File | null;
  uploading: boolean;
  handlePaymentAndUpload: () => void;
};

export default function PaymentButton({ file, uploading, handlePaymentAndUpload }: Props) {
  return (
    <button
      onClick={handlePaymentAndUpload}
      disabled={!file || uploading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {uploading ? 'Uploading...' : 'Pay & Upload'}
    </button>
  );
}