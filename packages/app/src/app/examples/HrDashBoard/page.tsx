// HRDashBoard.tsx
'use client';

import React, { useState } from 'react';
import './HrDashBoard.css'; // 引入 HrDashBoard.css 文件

const HRDashBoard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await fetch('/api/uploadResume', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Upload failed');
      }
    }
  };

  return (
    <div className="loginBox">
      <h1>HR Resume Verification</h1>
      <input type="file" onChange={handleFileChange} accept=".json" />
      <h5>简历须提交.json格式</h5>
      <button className="btn" onClick={handleUpload}>提交简历</button>

      {message && <p>验证结果：{message}</p>}
    </div>
  );
};

export default HRDashBoard;
