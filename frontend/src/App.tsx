import { useState } from 'react';
import axios from 'axios';
import type { UploadFileResponse } from '../../shared/api-spec';
import FileSelector from './components/FileSelector';
import PaymentButton from './components/PaymentButton';
import UploadStatus from './components/UploadStatus';
import UploadResult from './components/UploadResult';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<UploadFileResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handlePaymentAndUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      setError(null);

      const sessionRes = await axios.post('/api/payment/session', {
        fileId: fileId,
        currency: 'usd',
        amount: 10000,
      });

      const formData = new FormData();
      formData.append('file', file);

      const config: axios.AxiosRequestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: axios.AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        },
      };
      const uploadRes = await axios.post<UploadFileResponse>(
        '/api/upload',
        formData,
        config
      );

      setUploadResult(uploadRes.data);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">SnapSend</h1>
      {!uploadResult && (
        <>
          <FileSelector file={file} setFile={setFile} setFileId={setFileId} />
          <PaymentButton
            file={file}
            uploading={uploading}
            handlePaymentAndUpload={handlePaymentAndUpload}
          />
          {uploading && <UploadStatus progress={progress} />}
        </>
      )}
      {uploadResult && <UploadResult uploadResult={uploadResult} />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
