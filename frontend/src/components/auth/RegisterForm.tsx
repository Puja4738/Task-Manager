import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { RegisterDto } from '../../types';
import { User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 10) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit = async (data: RegisterDto) => {
    try {
      setIsLoading(true);
      await registerUser(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Create Account ✨
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Join us and start organizing your tasks today
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className={`input-field pl-12 ${
                  errors.name ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''
                }`}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="text-red-600 text-xs font-medium flex items-center space-x-1 animate-slide-down">
                <span>⚠️</span>
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

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

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-2 animate-slide-down">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 font-medium">Password Strength:</span>
                  <span className={`font-bold ${
                    passwordStrength.strength === 100 ? 'text-green-600' :
                    passwordStrength.strength >= 75 ? 'text-blue-600' :
                    passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300 rounded-full`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-red-600 text-xs font-medium flex items-center space-x-1 animate-slide-down">
                <span>⚠️</span>
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:underline font-semibold">
                Terms of Service
              </button>
              {' '}and{' '}
              <button type="button" className="text-blue-600 hover:underline font-semibold">
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-primary flex items-center justify-center space-x-2 text-base sm:text-lg py-3 sm:py-4"
            isLoading={isLoading}
          >
            {!isLoading && (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Create Account</span>
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
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link
          to="/login"
          className="block w-full text-center py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all duration-200 hover:scale-105"
        >
          Sign In Instead
        </Link>
      </div>
    </div>
  );
};