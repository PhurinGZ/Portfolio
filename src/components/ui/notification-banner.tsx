// components/ui/notification-banner.tsx
import { FC, ReactNode, useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, Bell } from 'lucide-react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationBannerProps {
  variant?: BannerVariant;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
  position?: 'top' | 'bottom';
  showIcon?: boolean;
  persistent?: boolean;
}

export const NotificationBanner: FC<NotificationBannerProps> = ({
  variant = 'info',
  children,
  onClose,
  className = '',
  position = 'top',
  showIcon = true,
  persistent = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!persistent) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [onClose, persistent]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const variantStyles = {
    info: {
      container: 'from-blue-600/90 via-blue-500/90 to-cyan-600/90',
      icon: <Info className="w-5 h-5" />,
      glow: 'from-blue-400/50 to-cyan-400/50',
      accent: 'from-blue-300 to-cyan-300',
    },
    success: {
      container: 'from-green-600/90 via-green-500/90 to-emerald-600/90',
      icon: <CheckCircle className="w-5 h-5" />,
      glow: 'from-green-400/50 to-emerald-400/50',
      accent: 'from-green-300 to-emerald-300',
    },
    warning: {
      container: 'from-yellow-600/90 via-yellow-500/90 to-orange-600/90',
      icon: <AlertTriangle className="w-5 h-5" />,
      glow: 'from-yellow-400/50 to-orange-400/50',
      accent: 'from-yellow-300 to-orange-300',
    },
    error: {
      container: 'from-red-600/90 via-red-500/90 to-rose-600/90',
      icon: <AlertCircle className="w-5 h-5" />,
      glow: 'from-red-400/50 to-rose-400/50',
      accent: 'from-red-300 to-rose-300',
    },
  };

  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
  };

  const styles = variantStyles[variant];

  if (!isVisible) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-50 ${positionStyles[position]} ${className}`}
      role="alert"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} opacity-30 blur-xl animate-pulse-slow`}></div>
        
        {/* Interactive Light Effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-white/20 via-white/10 to-transparent rounded-full blur-3xl transition-all duration-500 opacity-0 hover:opacity-100"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        
        {/* Floating Particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
              style={{
                left: `${15 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main Container */}
      <div className="relative">
        <div className={`backdrop-blur-2xl bg-gradient-to-r ${styles.container} border-b border-white/20 shadow-2xl`}>
          <div className="container mx-auto px-4 relative">
            {/* Content */}
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                {showIcon && (
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg animate-float">
                        <div className="text-white animate-pulse">
                          {styles.icon}
                        </div>
                      </div>
                      {/* Notification Bell */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center animate-bounce-slow">
                        <Bell className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-white">
                  <div className="text-sm font-medium leading-relaxed animate-fade-in">
                    {children}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Close Button */}
              {onClose && (
                <button
                  onClick={() => {
                    setIsVisible(false);
                    onClose();
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/close"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white group-hover/close:rotate-90 transition-transform duration-300" />
                </button>
              )}
            </div>
            
            {/* Progress Bar */}
            {!persistent && (
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full animate-progress-bar"></div>
            )}
          </div>
        </div>
        
        {/* Accent Line */}
        <div className={`h-1 bg-gradient-to-r ${styles.accent} animate-gradient-x`}></div>
      </div>
    </div>
  );
};