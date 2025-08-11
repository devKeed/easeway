"use client";

import { motion } from"framer-motion";
import { Loader2 } from"lucide-react";

interface LoadingSpinnerProps {
 size?:"sm" |"md" |"lg";
 text?: string;
 className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
 size ="md",
 text,
 className ="",
}) => {
 const sizeClasses = {
 sm:"w-4 h-4",
 md:"w-6 h-6",
 lg:"w-8 h-8",
 };

 const textSizeClasses = {
 sm:"text-sm",
 md:"text-base",
 lg:"text-lg",
 };

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className={`flex items-center justify-center space-x-2 ${className}`}
 >
 <Loader2 className={`${sizeClasses[size]} animate-spin text-[#065f46]`} />
 {text && (
 <span className={`${textSizeClasses[size]} text-gray-600`}>{text}</span>
 )}
 </motion.div>
 );
};

export default LoadingSpinner;
