import React from 'react';
import { v4 as uuidv4 } from 'uuid';


type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  setFileId: (id: string | null) => void;
};

export default function FileSelector({ file, setFile, setFileId }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileId(selectedFile ? uuidv4() : null);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {file && <p className="mt-2 text-sm">Selected file: {file.name}</p>}
    </div>
  );
}