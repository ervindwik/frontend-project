import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      try {
        await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadMessage('Upload successful');
      } catch (error) {
        setUploadMessage('Upload failed');
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadMessage && <div>{uploadMessage}</div>}
    </div>
  );
};

export default UploadPage;
