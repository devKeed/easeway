"use client";

import { motion } from "framer-motion";
import { AlertCircle, XCircle, CheckCircle, Info, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  persistent?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  description,
  duration = 5000,
  onClose,
  persistent = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!persistent && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, persistent]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      text: "text-green-800",
      button: "text-green-600 hover:bg-green-100",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      text: "text-red-800",
      button: "text-red-600 hover:bg-red-100",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-600",
      text: "text-yellow-800",
      button: "text-yellow-600 hover:bg-yellow-100",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      text: "text-blue-800",
      button: "text-blue-600 hover:bg-blue-100",
    },
  };

  const Icon = icons[type];
  const colorScheme = colors[type];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg border shadow-lg ${colorScheme.bg} ${colorScheme.border}`}
    >
      <div className="flex items-start">
        <Icon className={`w-5 h-5 mt-0.5 mr-3 ${colorScheme.icon}`} />
        <div className="flex-1 min-w-0">
          <h4 className={`text-body-sm font-axiforma ${colorScheme.text}`}>
            {message}
          </h4>
          {description && (
            <p className={`mt-1 text-base ${colorScheme.text} opacity-75`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={handleClose}
          className={`ml-4 p-1 rounded-md transition-colors ${colorScheme.button}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
