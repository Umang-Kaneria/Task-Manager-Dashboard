"use client";
import React, { useState } from 'react';
import useAuthStore from '../../store/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import PageContainer from '../../components/PageContainer';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const register = useAuthStore((state) => state.register);
  const router = require('next/navigation').useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <PageContainer>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <ErrorMessage message={error} />}
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">Already have an account? Login</a>
        </div>
      </form>
    </PageContainer>
  );
};

export default RegisterPage;
