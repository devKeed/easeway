"use client";

import { motion } from"framer-motion";
import { AlertTriangle, RefreshCw, ArrowLeft } from"lucide-react";

interface ErrorStateProps {
 title?: string;
 message: string;
 onRetry?: () => void;
 onBack?: () => void;
 showRetry?: boolean;
 showBack?: boolean;
 className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
 title ="Something went wrong",
 message,
 onRetry,
 onBack,
 showRetry = true,
 showBack = false,
 className ="",
}) => {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
 >
 <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
 <AlertTriangle className="w-8 h-8 text-red-600" />
 </div>

 <h3 className="text-h5-mobile md:text-h4-desktop font-axiforma text-gray-900 mb-2">{title}</h3>

 <p className="text-gray-600 mb-6 max-w-md text-body font-uber">{message}</p>

 <div className="flex space-x-3">
 {showBack && onBack && (
 <button
 onClick={onBack}
 className="inline-flex items-center px-4 py-2 border border-gray-300 text-body-sm font-axiforma rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065f46] transition-colors"
 >
 <ArrowLeft className="w-4 h-4 mr-2" />
 Go Back
 </button>
 )}

 {showRetry && onRetry && (
 <button
 onClick={onRetry}
 className="inline-flex items-center px-4 py-2 border border-transparent text-body-sm font-axiforma rounded-md text-white bg-[#065f46] hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065f46] transition-colors"
 >
 <RefreshCw className="w-4 h-4 mr-2" />
 Try Again
 </button>
 )}
 </div>
 </motion.div>
 );
};

export default ErrorState;
