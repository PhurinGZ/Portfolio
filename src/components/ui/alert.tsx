// components/ui/alert.tsx
import { FC, ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-50 border-blue-300 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    success: {
      container: 'bg-green-50 border-green-300 text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-300 text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    error: {
      container: 'bg-red-50 border-red-300 text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`flex items-start p-4 mb-4 border-l-4 rounded-md ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3 pt-0.5">{styles.icon}</div>
      <div className="flex-1">
        {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};