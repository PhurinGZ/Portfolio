// components/ui/toast.tsx
import { ReactNode, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  children: ReactNode;
  duration?: number;
  onClose?: () => void;
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const Toast = ({ 
  variant = 'success', 
  title, 
  children, 
  duration = 4000,
  onClose,
  className = '',
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    // Auto close
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose, duration]);

  const variantStyles = {
    info: {
      container: 'from-blue-500/20 to-cyan-500/20 border-blue-300/50',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      glow: 'from-blue-400/40 to-cyan-400/40',
      progress: 'from-blue-400 to-cyan-400',
    },
    success: {
      container: 'from-green-500/20 to-emerald-500/20 border-green-300/50',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      glow: 'from-green-400/40 to-emerald-400/40',
      progress: 'from-green-400 to-emerald-400',
    },
    warning: {
      container: 'from-yellow-500/20 to-orange-500/20 border-yellow-300/50',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      glow: 'from-yellow-400/40 to-orange-400/40',
      progress: 'from-yellow-400 to-orange-400',
    },
    error: {
      container: 'from-red-500/20 to-rose-500/20 border-red-300/50',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      glow: 'from-red-400/40 to-rose-400/40',
      progress: 'from-red-400 to-rose-400',
    },
  };

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const styles = variantStyles[variant];

  if (!isVisible) return null;

  return (
    <div className={`fixed ${positionStyles[position]} z-50 animate-toast-slide-in ${className}`}>
      {/* Container with enhanced effects */}
      <div className="group relative overflow-hidden max-w-sm">
        {/* Animated Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-glow`}></div>
        
        {/* Liquid Glass Container */}
        <div className={`relative backdrop-blur-2xl bg-gradient-to-br ${styles.container} border border-white/30 dark:border-gray-600/30 rounded-2xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-700`}>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 transition-all duration-500 hover:bg-white/60 dark:hover:bg-gray-900/60">
            <div className="flex items-start gap-3">
              {/* Enhanced Icon Container */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/60 to-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg transform group-hover:scale-110 transition-all duration-500">
                    <div className="animate-float">
                      {styles.icon}
                    </div>
                  </div>
                  {/* Floating Sparkle */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 animate-bounce-slow opacity-80 flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {title && (
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1 animate-fade-in">
                    {title}
                  </h4>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-delay">
                  {children}
                </p>
              </div>
              
              {/* Enhanced Close Button */}
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onClose) onClose();
                }}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-300/50 hover:from-gray-300/60 hover:to-gray-400/60 dark:from-gray-600/50 dark:to-gray-700/50 dark:hover:from-gray-500/60 dark:hover:to-gray-600/60 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/close"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover/close:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3 h-1 bg-gray-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${styles.progress} rounded-full transition-all duration-100 ease-linear`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};