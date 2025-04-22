// pages/alert-demo.tsx
"use client"

import { useState } from 'react';
import { Alert } from '@/components/ui/alert';
import { Toast } from '@/components/ui/toast';
import { NotificationBanner } from '@/components/ui/notification-banner';

export default function AlertDemo() {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [showBanner, setShowBanner] = useState(false);
  const [bannerVariant, setBannerVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  
  const handleShowToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    setToastVariant(variant);
    setShowToast(true);
  };
  
  const handleShowBanner = (variant: 'info' | 'success' | 'warning' | 'error') => {
    setBannerVariant(variant);
    setShowBanner(true);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Alert Components Demo</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Alert Components</h2>
        
        <Alert variant="info" title="Information">
          This is an informational alert. It provides general information to the user.
        </Alert>
        
        <Alert variant="success" title="Success" onClose={() => console.log('Alert closed')}>
          Operation completed successfully! Your changes have been saved.
        </Alert>
        
        <Alert variant="warning" title="Warning">
          Please be careful. This action cannot be undone once completed.
        </Alert>
        
        <Alert variant="error" title="Error">
          An error occurred while processing your request. Please try again.
        </Alert>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => handleShowToast('info')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Info Toast
          </button>
          
          <button 
            onClick={() => handleShowToast('success')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show Success Toast
          </button>
          
          <button 
            onClick={() => handleShowToast('warning')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Show Warning Toast
          </button>
          
          <button 
            onClick={() => handleShowToast('error')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Show Error Toast
          </button>
        </div>
        
        {showToast && (
          <Toast 
            variant={toastVariant} 
            title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
            onClose={() => setShowToast(false)}
          >
            This is a {toastVariant} toast notification that automatically disappears after 5 seconds.
          </Toast>
        )}
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Notification Banners</h2>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleShowBanner('info')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Info Banner
          </button>
          
          <button 
            onClick={() => handleShowBanner('success')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Show Success Banner
          </button>
          
          <button 
            onClick={() => handleShowBanner('warning')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Show Warning Banner
          </button>
          
          <button 
            onClick={() => handleShowBanner('error')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Show Error Banner
          </button>
        </div>
      </section>
      
      {showBanner && (
        <NotificationBanner 
          variant={bannerVariant}
          onClose={() => setShowBanner(false)}
          position="bottom"
        >
          This is a {bannerVariant} notification banner that appears at the bottom of the screen.
        </NotificationBanner>
      )}
    </div>
  );
}