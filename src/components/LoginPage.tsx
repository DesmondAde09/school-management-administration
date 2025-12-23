import React, { useState } from 'react';
import { User } from '../types';
import { mockUsers, mockSchool } from '../data/mockData';
import { Icons } from './Icons';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'principal' | 'teacher' | 'parent'>('principal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userMap = {
      principal: mockUsers.find(u => u.role === 'principal'),
      teacher: mockUsers.find(u => u.role === 'teacher'),
      parent: mockUsers.find(u => u.role === 'parent'),
    };
    const user = userMap[selectedRole];
    if (user) onLogin(user);
  };

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <div className="login-logo">
          <div className="login-logo-icon">
            <Icons.GraduationCap />
          </div>
          <h1>{mockSchool.name}</h1>
          <p>School Management System</p>
        </div>

        <h2 className="login-title">Sign in to your account</h2>

        <div className="role-selector">
          <button
            className={`role-btn ${selectedRole === 'principal' ? 'active' : ''}`}
            onClick={() => setSelectedRole('principal')}
          >
            <span className="role-btn-icon">👩‍💼</span>
            <span className="role-btn-label">Principal</span>
          </button>
          <button
            className={`role-btn ${selectedRole === 'teacher' ? 'active' : ''}`}
            onClick={() => setSelectedRole('teacher')}
          >
            <span className="role-btn-icon">👨‍🏫</span>
            <span className="role-btn-label">Teacher</span>
          </button>
          <button
            className={`role-btn ${selectedRole === 'parent' ? 'active' : ''}`}
            onClick={() => setSelectedRole('parent')}
          >
            <span className="role-btn-icon">👨‍👩‍👧</span>
            <span className="role-btn-label">Parent</span>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleLogin}>
          Sign In
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--gray-500)' }}>
          Demo: Click any role and sign in to explore
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
