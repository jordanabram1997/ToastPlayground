import React from 'react';
import useKeydown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, [])

  useKeydown('Escape', handleEscape)

  function createToast(message, variant) {
    const id = crypto.randomUUID();
  
    const newToast = {
      id,
      message,
      variant,
    };
  
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);

    setTimeout(() => {
      dismissToast(id);
    }, 10000);
  }

  function dismissToast(id) {
    const nextToasts = toasts.map((toast) => {
      if (toast.id === id) {
        return { ...toast, dismissed: true }; 
      }
      return toast;
    });
  
    setToasts(nextToasts);
  }

  return <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
