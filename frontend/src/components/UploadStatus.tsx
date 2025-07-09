import React from 'react';

type Props = {
  progress: number;
};

export default function UploadStatus({ progress }: Props) {
  return (
    <div className="w-full max-w-md mt-4">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-center mt-1">Uploading: {progress}%</p>
    </div>
  );
}