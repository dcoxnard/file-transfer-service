import React from 'react';
import type { UploadFileResponse } from '../../../shared/api-spec';

type Props = {
  uploadResult: UploadFileResponse;
};

export default function UploadResult({ uploadResult }: Props) {
  const expires = new Date(uploadResult.expiresAt).toLocaleString();

  return (
    <div className="text-center">
      <p className="text-green-600 font-semibold">File uploaded successfully!</p>
      <p className="mt-2">Share this link:</p>
      <code className="block mt-1 p-2 bg-gray-100 rounded break-words">
        {uploadResult.downloadUrl}
      </code>
      <p className="mt-2 text-sm text-gray-600">Expires: {expires}</p>
    </div>
  );
}