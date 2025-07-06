// components/ui/alert.tsx
import { FC, ReactNode, useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, Sparkles } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const variantStyles = {
    info: {
      container: 'from-blue-500/20 to-cyan-500/20 border-blue-300/50 text-blue-800 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      glow: 'from-blue-400/30 to-cyan-400/30',
    },
    success: {
      container: 'from-green-500/20 to-emerald-500/20 border-green-300/50 text-green-800 dark:text-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      glow: 'from-green-400/30 to-emerald-400/30',
    },
    warning: {
      container: 'from-yellow-500/20 to-orange-500/20 border-yellow-300/50 text-yellow-800 dark:text-yellow-200',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      glow: 'from-yellow-400/30 to-orange-400/30',
    },
    error: {
      container: 'from-red-500/20 to-rose-500/20 border-red-300/50 text-red-800 dark:text-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      glow: 'from-red-400/30 to-rose-400/30',
    },
  };

  const styles = variantStyles[variant];

  if (!isVisible) return null;

  return (
    <div
      className={`group relative overflow-hidden animate-slide-in-right ${className}`}
      role="alert"
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-glow`}></div>
      
      {/* Liquid Glass Container */}
      <div className={`relative backdrop-blur-2xl bg-gradient-to-br ${styles.container} border border-white/30 dark:border-gray-600/30 rounded-2xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-700`}>
        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 transition-all duration-500 hover:bg-white/50 dark:hover:bg-gray-900/50">
          <div className="flex items-start">
            {/* Animated Icon Container */}
            <div className="flex-shrink-0 mr-4 pt-0.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg transform group-hover:scale-110 transition-all duration-500">
                  <div className="animate-float">
                    {styles.icon}
                  </div>
                </div>
                {/* Floating Sparkles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 animate-bounce-slow opacity-80">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-bold mb-2 animate-fade-in">
                  {title}
                </h3>
              )}
              <div className="text-sm leading-relaxed animate-fade-in-delay">
                {children}
              </div>
            </div>
            
            {/* Enhanced Close Button */}
            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose();
                }}
                className="flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-300/50 hover:from-gray-300/60 hover:to-gray-400/60 dark:from-gray-600/50 dark:to-gray-700/50 dark:hover:from-gray-500/60 dark:hover:to-gray-600/60 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/close"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover/close:rotate-90 transition-transform duration-300" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-progress-bar"></div>
    </div>
  );
};