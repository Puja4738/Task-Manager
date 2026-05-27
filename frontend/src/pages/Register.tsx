import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { CheckSquare, TrendingUp, Award, Target } from 'lucide-react';

const Register: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Complete tasks 40% faster with smart organization',
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'Visualize achievements and stay motivated',
    },
    {
      icon: Target,
      title: 'Meet Deadlines',
      description: 'Never miss important dates with smart reminders',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse">
      {/* Right Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-2xl">
                <CheckSquare className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl xl:text-5xl font-black">Join Task Manager</h1>
            </div>
            <p className="text-xl text-purple-100 leading-relaxed">
              Start your journey to better productivity. Join thousands of users who trust TaskManager.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 animate-slide-up">
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <p className="text-4xl font-black mb-2">10K+</p>
              <p className="text-purple-100 text-sm font-semibold">Active Users</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <p className="text-4xl font-black mb-2">50K+</p>
              <p className="text-purple-100 text-sm font-semibold">Tasks Completed</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <p className="text-4xl font-black mb-2">99%</p>
              <p className="text-purple-100 text-sm font-semibold">Satisfaction</p>
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-purple-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Left Side - Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-black gradient-text">Task Manager</span>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;