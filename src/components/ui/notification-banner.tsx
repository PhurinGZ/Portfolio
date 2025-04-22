// components/ui/notification-banner.tsx
import { FC, ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationBannerProps {
  variant?: BannerVariant;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
  position?: 'top' | 'bottom';
}

export const NotificationBanner: FC<NotificationBannerProps> = ({
  variant = 'info',
  children,
  onClose,
  className = '',
  position = 'top',
}) => {
  const variantStyles = {
    info: {
      container: 'bg-blue-600 text-white',
      icon: <Info className="w-5 h-5" />,
    },
    success: {
      container: 'bg-green-600 text-white',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    warning: {
      container: 'bg-yellow-500 text-white',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    error: {
      container: 'bg-red-600 text-white',
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${positionStyles[position]} ${styles.container} ${className}`}
      role="alert"
    >
      <div className="container mx-auto px-4">
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">{styles.icon}</div>
            <div className="text-sm font-medium">{children}</div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
