'use client';
import React, { useState } from 'react';
import './AdminDashBoard.css'; // 确保正确引入 CSS

interface User {
  id: number;
  username: string;
  email: string;
  lastLogin: string;
}

interface Resume {
  id: number;
  username: string;
  fileName: string;
  uploadedDate: string;
}

const AdminDashBoard: React.FC = () => {
  // 直接初始化用户和简历数据
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      lastLogin: '2024-06-10T12:00:00Z',
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@example.com',
      lastLogin: '2024-06-11T15:00:00Z',
    },
  ]);

  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: 1,
      username: 'user1',
      fileName: 'resume_user1.pdf',
      uploadedDate: '2024-06-12',
    },
    {
      id: 2,
      username: 'user2',
      fileName: 'resume_user2.pdf',
      uploadedDate: '2024-06-13',
    },
  ]);

  return (
    <div className="loginBox">
      <h1>管理员控制面板</h1>
      <div>
        <h2>用户管理</h2>
        {users.map((user) => (
          <div key={user.id}>
            <p>用户名: {user.username}</p>
            <p>电子邮件: {user.email}</p>
            <p>最后登录: {user.lastLogin}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>简历管理</h2>
        {resumes.map((resume) => (
          <div key={resume.id}>
            <p>用户名: {resume.username}</p>
            <p>简历文件: {resume.fileName}</p>
            <p>上传日期: {resume.uploadedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;
