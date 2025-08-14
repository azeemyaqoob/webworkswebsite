"use client" // This directive must be at the very top

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import Layout from "../components/Layout";

export default function Login() {
  const [credentials, setCredentials] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!credentials.emailOrUsername || !credentials.password) {
        throw new Error('Please fill in all fields');
      }

      // Check for specific credentials
      if (
        (credentials.emailOrUsername === 'naveed5050@gmail.com' || 
         credentials.emailOrUsername === 'naveed5050') && 
        credentials.password === 'naveed5050@!'
      ) {
        // Store credentials in localStorage
        localStorage.setItem('userEmail', 'naveed5050@gmail.com');
        localStorage.setItem('userPassword', 'naveed5050@!');
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0D0D0D] relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00E5FF]/5"></div>
        <div className="absolute top-10 right-10 w-2 h-2 bg-[#00E5FF]/40 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-16 w-3 h-3 bg-[#00E5FF]/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-md mx-auto backdrop-blur-md bg-[#1A1A1A]/50 border border-[#00E5FF]/20 rounded-2xl p-8 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2 font-sans">
                Welcome <span className="text-[#00E5FF]">Back</span>
              </h1>
              <p className="text-[#F5F5F5]/80">Sign in to access your portfolio</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-[#F5F5F5]/80 mb-2">
                  Email or Username
                </label>
                <input
                  id="emailOrUsername"
                  name="emailOrUsername"
                  type="text"
                  className="w-full px-4 py-3 bg-[#1A1A1A]/70 border border-[#00E5FF]/20 rounded-lg text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  value={credentials.emailOrUsername}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#F5F5F5]/80 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 bg-[#1A1A1A]/70 border border-[#00E5FF]/20 rounded-lg text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>

        

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-[#0D0D0D] bg-[#00E5FF] hover:bg-[#00E5FF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5FF]/50 transition-all ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0D0D0D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </div>
            </form>

           
          </div>
        </div>
      </section>
    </Layout>
  )
}