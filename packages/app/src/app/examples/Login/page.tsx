'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [identity, setIdentity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // 检查是否使用默认账号密码登录
      if (username === 'stu' && password === '123456') {
        router.push('/examples/StudentDashBoard');
        return;
      } else if (username === 'admin' && password === '123456') {
        router.push('/examples/AdminDashBoard');
        return;
      } else if (username === 'rz' && password === '123456') {
        router.push('/examples/RzDashBoard');
        return;
      } else if (username === 'hr' && password === '123456') {
        router.push('/examples/HrDashBoard');
        return;
      }
  
      // 正常登录流程
      const response = await fetch('http://your-backend-url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, identity }),
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('登录成功');
        switch (identity) {
          case 'student':
            router.push('/examples/StudentDashBoard');
            break;
          case 'admin':
            router.push('/examples/AdminDashBoard');
            break;
          case 'authentication':
            router.push('/examples/RzDashBoard');
            break;
          case 'hr':
            router.push('/examples/HrDashBoard');
            break;
          default:
            break;
        }
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('登录失败', error);
      setErrorMessage('登录失败，请稍后再试');
    }
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh'
    }}>
      <div style={{ 
        position: 'absolute',
        left: '50%', 
        top: '50%', 
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Log In</h1>
        <select value={identity} onChange={(e) => setIdentity(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }}>
          <option value="">选择身份</option>
          <option value="student">学生</option>
          <option value="authentication">认证机构</option>
          <option value="hr">HR</option>
          <option value="admin">管理员</option>
        </select>
        <input type="text" placeholder="请输入账号" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }} />
        <input type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }} />
        <button onClick={handleLogin} style={{ 
          marginBottom: '0.5rem', 
          padding: '0.5rem 1rem', 
          fontSize: '1rem', 
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer' 
        }}>登录</button>
        {errorMessage && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{errorMessage}</p>}
        <p style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'black' }}>没有账号？<a href="/register" style={{ color: 'black' }}>点击注册</a></p>
        <p style={{ marginTop: '0', fontSize: '0.8rem', color: 'black' }}>忘记密码？<a href="/examples/Reset" style={{ color: 'black' }}>点击重置</a></p>
      </div>
    </div>
  );
}
