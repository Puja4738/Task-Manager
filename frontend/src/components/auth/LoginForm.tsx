import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../common/Button';
// import { Input } from '../common/Input';
import { LoginDto } from '../../types';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      setIsLoading(true);
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Welcome Back! 👋
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Sign in to continue managing your tasks
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className={`input-field pl-12 ${
                  errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
                }`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-xs font-medium flex items-center space-x-1 animate-slide-down">
                <span>⚠️</span>
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input-field pl-12 pr-12 ${
                  errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs font-medium flex items-center space-x-1 animate-slide-down">
                <span>⚠️</span>
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-primary flex items-center justify-center space-x-2 text-base sm:text-lg py-3 sm:py-4"
            isLoading={isLoading}
          >
            {!isLoading && (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Link
          to="/register"
          className="block w-full text-center py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-200 hover:scale-105"
        >
          Create New Account
        </Link>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-8">
        By signing in, you agree to our{' '}
        <button className="text-blue-600 hover:underline font-medium">Terms</button>
        {' '}and{' '}
        <button className="text-blue-600 hover:underline font-medium">Privacy Policy</button>
      </p>
    </div>
  );
};