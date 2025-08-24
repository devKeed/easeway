"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setupProviders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF2F6] to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#0E2127] hover:text-[#FF3133] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base">Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-[#0E2127] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-body font-uber">
              Sign in to access your account
            </p>
          </motion.div>
        </div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  {provider.id === "github" && (
                    <motion.button
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-[#24292e] hover:bg-[#1e2327] text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Github className="w-5 h-5" />
                      Sign in with {provider.name}
                    </motion.button>
                  )}
                </div>
              ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-body text-gray-600 font-uber">
              By signing in, you agree to our terms of service and privacy
              policy.
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium mb-2">
              New to Easeway Medicare?
            </h3>
            <p className="text-blue-700 text-body font-uber">
              Sign in with GitHub to create your account and start booking
              appointments.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
