'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identity, setIdentity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('输入密码不一致');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/examples/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, identity }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('注册成功');
        router.push('/examples/Login');
      } else {
        setErrorMessage(data.message || '注册失败，请稍后再试');
      }
    } catch (error) {
      console.error('注册失败', error);
      setErrorMessage('注册失败，请稍后再试');
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
        <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Register</h1>
        <select value={identity} onChange={(e) => setIdentity(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }}>
          <option value="student">学生</option>
          <option value="authentication">认证机构</option>
          <option value="hr">HR</option>
          <option value="admin">管理员</option>
        </select>
        <input type="text" placeholder="请输入账号" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }} />
        <input type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }} />
        <input type="password" placeholder="确认密码" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ marginBottom: '0.5rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }} />
        <button onClick={handleRegister} style={{ 
          marginBottom: '0.5rem', 
          padding: '0.5rem 1rem', 
          fontSize: '1rem', 
          width: '100%',
          backgroundColor: 'MidnightBlue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer' 
        }}>注册</button>
        {errorMessage && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{errorMessage}</p>}
        <p style={{ marginBottom: '1rem', fontSize: '0.8rem', color: 'black' }}>已有账号？<a href="/examples/Login" style={{ color: 'black' }}>去登录</a></p>
      </div>
    </div>
  );
}
