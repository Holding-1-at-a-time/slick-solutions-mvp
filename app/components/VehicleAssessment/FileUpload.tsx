import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const uploadFile = useMutation(api.mediaFiles.uploadFile);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        await uploadFile(new Uint8Array(buffer), file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {file && <p>Preview: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
