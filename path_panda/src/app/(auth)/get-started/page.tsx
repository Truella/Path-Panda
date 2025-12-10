'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase as supabaseInstance } from '../../../../db/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '../../../../hooks/useAuth';
import { Panda } from 'lucide-react'; // Import Panda icon
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthFormData {
  email: string;
  password: string;
}

const AnimatedGradientStyle = () => (
  <style jsx global>{`
    @keyframes gradient-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animated-gradient-bg {
      background-size: 400% 400%;
      animation: gradient-animation 15s ease infinite;
    }
  `}</style>
);

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<AuthFormData>();
  const supabase = supabaseInstance;
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleAuth: SubmitHandler<AuthFormData> = async (data) => {
    setLoading(true);
    setError(null);
    const { email, password } = data;

    let authError = null;

    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      authError = error;
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      authError = error;
    }

    if (authError) {
      setError(authError.message);
      toast.error(authError.message);
      setLoading(false);
    } else {
      reset();
      toast.success(isSignIn ? 'Signed in successfully!' : 'Account created successfully!');
      // The useEffect will handle the redirect
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/get-started`,
      },
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };
  
  const switchMode = (signIn: boolean) => {
    setIsSignIn(signIn);
    setError(null);
    reset();
  }

  return (
    <>
      <AnimatedGradientStyle />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-[#f9f7fe] via-[#fef9f5] to-[#faf4ed] animated-gradient-bg">
        <div className="w-full max-w-md">
          {/* PathPanda Logo and Text */}
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]">
                <Panda className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent">
                PathPanda
              </span>
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-2 min-h-[560px]">
            {/* Tab Component */}
            <div className="flex bg-gray-100/70 rounded-xl p-1 relative">
              {['Sign In', 'Sign Up'].map((item) => (
                <button
                  key={item}
                  onClick={() => switchMode(item === 'Sign In')}
                  className={`w-1/2 p-2.5 font-semibold rounded-lg transition-colors text-lg relative ${isSignIn === (item === 'Sign In') ? 'text-[#2d2d2f]' : 'text-[#2d2d2f]/60 hover:text-[#2d2d2f]'}`}
                >
                  {isSignIn === (item === 'Sign In') && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-lg shadow-md"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-[#2d2d2f] mb-2">
                {isSignIn ? 'Welcome Back!' : 'Create an Account'}
              </h2>
              <p className="text-[#2d2d2f] mb-6">
                {isSignIn
                  ? 'Sign in to continue your journey'
                  : 'Get started in just a few steps'}
              </p>

              {error && (
                <div className="mb-4 text-red-500 text-sm p-3 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(handleAuth)}>
                <div className="mb-4">
                  <label
                    className="block text-[#2d2d2f] text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#7a5e46] text-[#2d2d2f] placeholder-[#2d2d2f]/70"
                    {...register('email', { required: true })}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-[#2d2d2f] text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#7a5e46] text-[#2d2d2f] placeholder-[#2d2d2f]/70"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading
                    ? 'Processing...'
                    : isSignIn
                      ? 'Sign In'
                      : 'Create Account'}
                </button>

                {/* 
                 <div className="my-6 flex items-center">
                  <div className="grow border-t border-gray-300"></div>
                  <span className="mx-4 text-xs text-[#2d2d2f]">OR</span>
                  <div className="grow border-t border-gray-300"></div>
                </div>
               
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-3 px-4 flex items-center justify-center gap-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  <Image src="/icons/google.svg" alt="Google icon" width={20} height={20} />
                  <span className="font-semibold text-[#2d2d2f]">{isSignIn ? 'Sign In with Google' : 'Sign Up with Google'}</span> 
                </button>*/}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

