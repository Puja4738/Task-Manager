import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { CheckSquare, Zap, Shield, Users } from 'lucide-react';

const Login: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Collaborate with instant task synchronization',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Assign tasks and track progress together',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl shadow-2xl">
                <CheckSquare className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl xl:text-5xl font-black">Task Manager</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Streamline your workflow, boost productivity, and achieve more with intelligent task management.
            </p>
          </div>

          <div className="space-y-6 animate-slide-up">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-blue-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-black gradient-text">Task Manager</span>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

// Add these keyframes to your index.css