// components/ui/toast.tsx
import { FC, ReactNode, useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  children: ReactNode;
  duration?: number; // Duration in ms
  onClose?: () => void;
  className?: string;
}

export const Toast: FC<ToastProps> = ({
  variant = 'info',
  title,
  children,
  duration = 5000, // Default 5 seconds
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const variantStyles = {
    info: {
      container: 'bg-white border-blue-500 text-gray-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    success: {
      container: 'bg-white border-green-500 text-gray-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      container: 'bg-white border-yellow-500 text-gray-800',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    error: {
      container: 'bg-white border-red-500 text-gray-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
  };

  const styles = variantStyles[variant];

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-start p-4 border-l-4 rounded-md shadow-lg max-w-sm ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3 pt-0.5">{styles.icon}</div>
      <div className="flex-1">
        {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};