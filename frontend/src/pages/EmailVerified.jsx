import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'already'
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          if (data.message.includes('already')) {
            setStatus('already');
          } else {
            setStatus('success');
          }
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Email verification failed.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
    }
  }, [token]);

  const renderIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-20 h-20 text-green-500" />;
      case 'already':
        return <AlertCircle className="w-20 h-20 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-20 h-20 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 dark:from-neutral-900 dark:to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="flex justify-center mb-6"
        >
          {renderIcon()}
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
          {status === 'success' && 'Email Verified Successfully!'}
          {status === 'already' && 'Email Already Verified'}
          {status === 'error' && 'Verification Failed'}
          {status === 'loading' && 'Verifying Email...'}
        </h1>

        <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-6">
          {message}
        </p>

        {(status === 'success' || status === 'already') && (
          <a
            href="/signin"
            className="inline-block px-6 py-3 text-white bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition"
          >
            Go to Login
          </a>
        )}

        <div className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          {status === 'success' || status === 'already'
            ? "Didn’t request this? You can safely ignore this page."
            : null}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerified;
