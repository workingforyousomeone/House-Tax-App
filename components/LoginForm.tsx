import React, { useState } from 'react';
import { User as UserIcon, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Input } from './ui/Input';
import { LoginCredentials } from '../types';
import { USERS } from '../data/mockData';

interface LoginFormProps {
  onLogin: (creds: LoginCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && password) {
      onLogin({ userId, password });
    }
  };

  return (
    <div className="w-full max-w-[420px] p-4 perspective-[1000px]">
      <div className="animate-fade-in relative z-10">
        <GlassCard className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 mb-5 ring-1 ring-white/20 shadow-xl">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl"></div>
              <UserIcon className="w-8 h-8 text-white relative z-10" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2 tracking-tight">
              House Tax App
            </h2>
            <p className="text-white/40 text-sm font-light">Enter credentials to manage clusters</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="User ID"
              type="text"
              placeholder="e.g. 10190758-WEA"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              icon={<UserIcon size={18} />}
              required
              autoFocus
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
            />

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center backdrop-blur-md">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full group relative
                  bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
                  bg-[length:200%_auto] hover:bg-right
                  text-white font-semibold py-4 px-4 rounded-xl
                  shadow-[0_0_20px_rgba(16,185,129,0.3)]
                  hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]
                  transition-all duration-500
                  disabled:opacity-70 disabled:cursor-not-allowed
                  overflow-hidden
                  border border-white/10
                "
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span className="text-sm">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      Secure Login
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
          <div className="mt-8 text-center border-t border-white/10 pt-4">
             <p className="text-[10px] text-white/30 uppercase tracking-[0.1em]">
               Authorized Personnel Only
             </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};